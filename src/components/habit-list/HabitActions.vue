<script setup lang="ts">
import type { Habit } from '@/types';

defineProps<{
  habit: Habit;
  isStopped: boolean;
}>();

defineEmits<{
  edit: [];
  stop: [];
  delete: [];
  resume: [];
}>();
</script>

<template>
  <div class="habit-actions">
    <button
      title="Edit"
      type="button"
      :aria-label="`Edit ${habit.name}`"
      @click="$emit('edit')"
    >
      <i class="fa fa-pen" aria-hidden="true"></i>
    </button>
    <button
      v-if="!isStopped"
      title="Stop this habit"
      type="button"
      :aria-label="`Stop tracking ${habit.name}`"
      @click="$emit('stop')"
    >
      <i class="fa fa-pause" aria-hidden="true"></i>
    </button>
    <button
      title="Delete this habit"
      type="button"
      class="delete-btn"
      :aria-label="`Delete ${habit.name}`"
      @click="$emit('delete')"
    >
      <i class="fa fa-trash" aria-hidden="true"></i>
    </button>
    <button
      v-if="isStopped"
      title="Resume this habit"
      type="button"
      :aria-label="`Resume tracking ${habit.name}`"
      @click="$emit('resume')"
    >
      <i class="fa fa-play" aria-hidden="true"></i>
    </button>
  </div>
</template>
