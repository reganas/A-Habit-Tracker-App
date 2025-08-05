<script setup lang="ts">
type Props = {
  visible: boolean;
  message: string;
};

defineProps<Props>();

const emit = defineEmits<{
  confirm: [];
  cancel: [];
}>();

function confirmAction(): void {
  emit('confirm');
}

function cancelAction(): void {
  emit('cancel');
}
</script>

<template>
  <div v-if="visible" class="modal-backdrop">
    <div class="modal">
      <p>{{ message }}</p>
      <button @click="confirmAction">Yes</button>
      <button @click="cancelAction">No</button>
    </div>
  </div>
</template>

<style scoped>
.modal-backdrop {
  position: relative;
  z-index: 1000;
}

.modal {
  background: white;
  padding: 0.5rem;
  border-radius: 6px;
  color: #333;
  box-shadow: 0 2px 8px rgb(0 0 0 / 20%);
  border: 1px solid #ddd;
  margin-top: 0.25rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: fit-content;
  margin-left: auto;
}

.modal p {
  margin: 0;
  margin-right: 0.5rem;
  font-size: 0.9rem;
}

button {
  margin: 0;
  padding: 0.25rem 0.5rem;
  font-size: 0.8rem;
}
</style>
