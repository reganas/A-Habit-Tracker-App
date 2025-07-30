import { ref, watch, type Ref } from 'vue';
import type { Habit, CompletedHabitsByDay, HabitStore } from '@/types';

export default function useHabitStore(): HabitStore {
  const storedHabits = localStorage.getItem('habits');
  const storedCompleted = localStorage.getItem('completedHabitsByDay');

  const habits: Ref<Habit[]> = ref<Habit[]>([]);
  const completedHabitsByDay: Ref<CompletedHabitsByDay> = ref<CompletedHabitsByDay>({});

  // Parse stored data safely
  if (storedHabits) {
    try {
      habits.value = JSON.parse(storedHabits) as Habit[];
    } catch (error) {
      console.warn('Failed to parse habits from localStorage:', error);
    }
  }

  if (storedCompleted) {
    try {
      completedHabitsByDay.value = JSON.parse(storedCompleted) as CompletedHabitsByDay;
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
    (val: Habit[]) => {
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
    (val: CompletedHabitsByDay) => {
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
