<template>
  <div>
    <p v-if="totalCount === 0" class="habit-prompt">
      Press the <span style="font-weight: bold">+</span> button above to
      add your first habit!
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

<script setup>
import { computed } from 'vue';
import HabitItem from './HabitItem.vue';

const props = defineProps({
  habits: {
    type: Array,
    default: () => [],
  },
  completedHabits: {
    type: Array,
    default: () => [],
  },
  isFutureDay: Boolean,
  currentDate: {
    type: String,
    default: '',
  },
  isHabitStoppedOnDate: {
    type: Function,
    required: true,
  },
});

const visibleHabits = computed(() =>
  props.habits
    .filter(habit => habit.createdDate <= props.currentDate)
    .map(habit => ({
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
    activeHabits.value.filter(h => props.completedHabits.includes(h.id)).length,
);
const leftCount = computed(() => totalCount.value - completedCount.value);

const emit = defineEmits(['toggle', 'edit', 'stop', 'delete', 'resume']);

function toggleHabit(id) {
  emit('toggle', id);
}

function editHabit(payload) {
  emit('edit', payload);
}

function stopHabit(id) {
  emit('stop', id);
}

function deleteHabit(id) {
  emit('delete', id);
}

function resumeHabit(id) {
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
