<template>
  <span v-if="completed" class="completed-msg">
    <span class="material-icons" style="color: #218838; vertical-align: middle"
      >check_circle</span
    >
    Completed for today!
  </span>
  <span v-else class="not-completed-msg">
    <span class="material-icons" style="color: #6c757d; vertical-align: middle"
      >error_outline</span
    >
    Habit not completed yet!
  </span>
</template>

<script setup lang="ts">
interface Props {
  completed: boolean;
}

defineProps<Props>();
</script>
