/* eslint-disable no-console */
import { ref, watch } from 'vue';

export default function useHabitStore() {
  const storedHabits = localStorage.getItem('habits');
  const storedCompleted = localStorage.getItem('completedHabitsByDay');

  const habits = ref([]);
  const completedHabitsByDay = ref({});

  // Parse stored data safely
  if (storedHabits) {
    try {
      habits.value = JSON.parse(storedHabits);
    } catch (error) {
      console.warn('Failed to parse habits from localStorage:', error);
    }
  }

  if (storedCompleted) {
    try {
      completedHabitsByDay.value = JSON.parse(storedCompleted);
    } catch (error) {
      console.warn(
        'Failed to parse completed habits from localStorage:',
        error,
      );
    }
  }

  // Persist to localStorage with error handling
  watch(
    habits,
    val => {
      try {
        localStorage.setItem('habits', JSON.stringify(val));
      } catch (error) {
        console.warn('Failed to save habits to localStorage:', error);
      }
    },
    { deep: true },
  );

  watch(
    completedHabitsByDay,
    val => {
      try {
        localStorage.setItem('completedHabitsByDay', JSON.stringify(val));
      } catch (error) {
        console.warn('Failed to save completed habits to localStorage:', error);
      }
    },
    { deep: true },
  );

  return {
    habits,
    completedHabitsByDay,
  };
}
