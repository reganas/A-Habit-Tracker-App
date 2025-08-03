<template>
  <div>
    <p v-if="totalCount === 0" class="habit-prompt">
      Press the <span style="font-weight: bold">+</span> button above to add
      your first habit!
    </p>
    <template v-else>
      <p class="habit-prompt">Tick the box if you completed the habit today!</p>
      <p class="habit-summary">
        Completed: {{ completedCount }} / {{ totalCount }} &nbsp;|&nbsp; Left:
        {{ leftCount }}
      </p>
      <p
        v-if="totalCount > 0 && completedCount === totalCount"
        class="all-set-msg"
      >
        <span
          class="material-icons"
          style="color: #218838; vertical-align: middle"
          >check_circle</span
        >
        All set for today!
      </p>
    </template>
    <ul>
      <HabitItem
        v-for="habit in visibleHabits"
        :key="habit.id"
        :habit="habit"
        :completed="completedHabits.includes(habit.id)"
        :disabled="isFutureDay || habit.isStopped"
        :is-stopped="habit.isStopped"
        :all-habits="habits"
        @toggle="toggleHabit(habit.id)"
        @edit="editHabit"
        @stop="stopHabit"
        @delete="deleteHabit"
        @resume="resumeHabit"
      />
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { Habit, HabitEditData, DateString } from '@/types';
import HabitItem from './HabitItem.vue';

interface Props {
  habits: Habit[];
  completedHabits: number[];
  isFutureDay: boolean;
  currentDate: DateString;
  isHabitStoppedOnDate: (habit: Habit, date: DateString) => boolean;
}

const props = withDefaults(defineProps<Props>(), {
  habits: () => [],
  completedHabits: () => [],
  isFutureDay: false,
  currentDate: '',
});

const emit = defineEmits<{
  toggle: [habitId: number];
  edit: [data: HabitEditData];
  stop: [habitId: number];
  delete: [habitId: number];
  resume: [habitId: number];
}>();

const visibleHabits = computed(() =>
  props.habits
    .filter((habit: Habit) => habit.createdDate <= props.currentDate)
    .map((habit: Habit) => ({
      ...habit,
      isStopped: props.isHabitStoppedOnDate(habit, props.currentDate),
    })),
);

const activeHabits = computed(() =>
  visibleHabits.value.filter(habit => !habit.isStopped),
);

const totalCount = computed(() => activeHabits.value.length);
const completedCount = computed(
  () =>
    activeHabits.value.filter((h: Habit) =>
      props.completedHabits.includes(h.id),
    ).length,
);
const leftCount = computed(() => totalCount.value - completedCount.value);

function toggleHabit(id: number): void {
  emit('toggle', id);
}

function editHabit(payload: HabitEditData): void {
  emit('edit', payload);
}

function stopHabit(id: number): void {
  emit('stop', id);
}

function deleteHabit(id: number): void {
  emit('delete', id);
}

function resumeHabit(id: number): void {
  emit('resume', id);
}
</script>

<style scoped>
.habit-prompt {
  text-align: center;
  margin-bottom: 0.5rem;
  color: #218838;
  font-size: 1.1rem;
  font-weight: 600;
}

.habit-summary {
  text-align: center;
  margin-bottom: 1rem;
  color: #218838;
  font-size: 1.1rem;
  font-weight: 600;
}
</style>
