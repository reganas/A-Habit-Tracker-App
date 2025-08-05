import { ref, watch } from 'vue';
import type { Ref } from 'vue';
import type { Habit, CompletedHabitsByDay, HabitStore } from '@/types';
import { STORAGE_KEYS } from '@/config/translations.ts';

export default function useHabitStore(): HabitStore {
  const storedHabits = localStorage.getItem(STORAGE_KEYS.HABITS);
  const storedCompleted = localStorage.getItem(
    STORAGE_KEYS.COMPLETED_HABITS_BY_DAY,
  );

  const habits: Ref<Habit[]> = ref<Habit[]>([]);
  const completedHabitsByDay: Ref<CompletedHabitsByDay> =
    ref<CompletedHabitsByDay>({});

  if (storedHabits) {
    try {
      habits.value = JSON.parse(storedHabits) as Habit[];
    } catch (error) {
      console.warn('Failed to parse habits from localStorage:', error);
    }
  }

  if (storedCompleted) {
    try {
      completedHabitsByDay.value = JSON.parse(
        storedCompleted,
      ) as CompletedHabitsByDay;
    } catch (error) {
      console.warn(
        'Failed to parse completed habits from localStorage:',
        error,
      );
    }
  }

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
