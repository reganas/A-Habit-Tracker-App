<script setup lang="ts">
import appConfig from '@/config/appConfig';
import { ref, watch } from 'vue';
import type { Habit, HabitEditData } from '@/types';
import HabitActions from './HabitActions.vue';
import StopDeleteConfirmation from './StopDeleteConfirmation.vue';
import { MESSAGES, BUTTON_LABELS, STATUS_LABELS } from '@/config/constants';

type Props = {
  habit: Habit;
  completed: boolean;
  disabled: boolean;
  isStopped: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  completed: false,
  disabled: false,
  isStopped: false,
});

const emit = defineEmits<{
  toggle: [habitId: number];
  edit: [data: HabitEditData];
  stop: [habitId: number];
  delete: [habitId: number];
  resume: [habitId: number];
}>();

const editing = ref<boolean>(false);
const editName = ref<string>(props.habit.name);
const showDeleteModal = ref<boolean>(false);
const showStopModal = ref<boolean>(false);
const isDuplicate = ref<boolean>(false);

watch(
  () => props.habit.name,
  (newName: string) => {
    editName.value = newName;
  },
);

function deleteHabit(): void {
  emit('delete', props.habit.id);
  showDeleteModal.value = false;
}

function stopHabit(): void {
  emit('stop', props.habit.id);
  showStopModal.value = false;
}

function onToggle(): void {
  emit('toggle', props.habit.id);
}

function trySaveEdit(): void {
  if (!editName.value.trim()) {
    return;
  }
  if (isDuplicate.value) {
    return;
  }
  if (editName.value !== props.habit.name) {
    emit('edit', { id: props.habit.id, name: editName.value.trim() });
  }
  editing.value = false;
}

function cancelEdit(): void {
  editing.value = false;
  isDuplicate.value = false;
}
</script>

<template>
  <li class="habit-item">
    <!-- Editing mode for active habits -->
    <div v-if="editing" class="edit-mode">
      <input
        v-model="editName"
        type="text"
        :maxlength="appConfig.maxHabitNameLength"
        autofocus
        @keyup.enter="trySaveEdit"
        @keyup.escape="cancelEdit"
      />
      <div class="edit-actions">
        <button
          type="button"
          :disabled="!editName.trim() || isDuplicate"
          @click="trySaveEdit"
        >
          {{ BUTTON_LABELS.OK }}
        </button>
        <button type="button" @click="cancelEdit">
          {{ BUTTON_LABELS.CANCEL }}
        </button>
      </div>
      <div v-if="isDuplicate" class="edit-error">
        {{ MESSAGES.DUPLICATE_NAME_ERROR }}
      </div>
      <div v-else-if="!editName.trim()" class="edit-error">
        {{ MESSAGES.EMPTY_NAME_ERROR }}
      </div>
    </div>

    <!-- Active habit display -->
    <div v-else-if="!isStopped" class="habit-label">
      <div class="habit-header">
        <input
          type="checkbox"
          :checked="completed"
          :disabled="disabled"
          :aria-label="`Mark ${habit.name} as ${completed ? 'incomplete' : 'complete'}`"
          @change="onToggle"
        />
        <span class="habit-name">{{ habit.name }}</span>
      </div>
      <HabitActions
        :habit="habit"
        :is-stopped="isStopped"
        @edit="editing = true"
        @stop="showStopModal = true"
        @delete="showDeleteModal = true"
        @resume="$emit('resume', habit.id)"
      />
    </div>

    <!-- Stopped habit display -->
    <div v-else class="habit-label">
      <div class="habit-header">
        <span class="habit-name stopped">
          {{ habit.name }} {{ STATUS_LABELS.STOPPED }}
        </span>
      </div>
      <HabitActions
        :habit="habit"
        :is-stopped="isStopped"
        @edit="editing = true"
        @stop="showStopModal = true"
        @delete="showDeleteModal = true"
        @resume="$emit('resume', habit.id)"
      />
    </div>

    <!-- Confirmation Modals -->
    <StopDeleteConfirmation
      v-if="showDeleteModal && !showStopModal"
      :visible="showDeleteModal"
      :message="MESSAGES.DELETE_CONFIRMATION"
      @confirm="deleteHabit"
      @cancel="showDeleteModal = false"
    />

    <StopDeleteConfirmation
      v-if="showStopModal && !showDeleteModal"
      :visible="showStopModal"
      :message="MESSAGES.STOP_CONFIRMATION"
      @confirm="stopHabit"
      @cancel="showStopModal = false"
    />
  </li>
</template>

<style scoped>
.habit-label {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  cursor: default;
}

.habit-name {
  flex: 1;
  text-align: left;
  font-size: 1.2rem;
  color: #218838;
  font-weight: 600;
  word-break: break-word;
  white-space: normal;
  max-width: 100%;
  display: block;
}

.habit-name.stopped {
  opacity: 0.7;
  font-style: italic;
}

.habit-actions {
  display: flex;
  gap: 0.25rem;
  margin-left: auto;
}

.edit-mode {
  width: 100%;
}

.edit-mode input {
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  border: 2px solid #646cff;
  border-radius: 4px;
}

.edit-actions {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.edit-actions button {
  background: linear-gradient(45deg, #218838, #1ea085);
  color: white;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(33, 136, 56, 0.3);
  padding: 0.5rem 1rem;
  border-radius: 6px;
}

.edit-actions button:hover:not(:disabled) {
  background: linear-gradient(45deg, #1e7e34, #1a5f3a);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(33, 136, 56, 0.4);
}

.edit-error {
  color: red;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

.stopped-habit {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
}

.habit-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

button {
  min-width: 40px;
  min-height: 40px;
  font-size: 1rem;
}

.habit-actions button {
  padding: 0.5rem;
  font-size: 1rem;
  border-radius: 6px;
  min-width: 44px;
  min-height: 44px;
  background: linear-gradient(45deg, #218838, #1ea085);
  color: white;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(33, 136, 56, 0.3);
}

.habit-actions button:hover:not(:disabled) {
  background: linear-gradient(45deg, #1e7e34, #1a5f3a);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(33, 136, 56, 0.4);
}

/* Mobile optimizations */
@media (width <= 578px) {
  .habit-label {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .stopped-habit {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .habit-actions {
    gap: 0.5rem;
    align-self: stretch;
    margin-left: 0;
  }

  .habit-actions button {
    padding: 0.4rem;
    font-size: 0.85rem;
    min-width: 36px;
    min-height: 36px;
  }
}
</style>
