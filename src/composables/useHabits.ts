import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import type { Habit, HabitStore, HabitEditData, DateString } from '@/types';

export default function useHabits(
  habitStore: HabitStore,
  initialDate?: DateString,
) {
  const { habits, completedHabitsByDay } = habitStore;
  const showAddHabitMode = ref<boolean>(false);
  const newHabitName = ref<string>('');
  const error = ref<string>('');
  const success = ref<string>('');
  const loading = ref<boolean>(false);

  // Only use route if we're in a Vue component context
  let route: any = null;
  try {
    route = useRoute();
  } catch (e) {
    // We're in a test environment, route is not available
  }

  const selectedDate = ref<DateString>(
    initialDate ||
      (route?.params?.date as string) ||
      new Date().toISOString().slice(0, 10),
  );

  // Keep selectedDate in sync with the route (only if route exists)
  if (route) {
    watch(
      () => route.params.date,
      newDate => {
        selectedDate.value =
          (newDate as string) || new Date().toISOString().slice(0, 10);
      },
      { immediate: true },
    );
  }

  function completedHabits(): number[] {
    return completedHabitsByDay.value[selectedDate.value] || [];
  }

  // Computed; isFutureDay
  function isFutureDay(): boolean {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const sel = new Date(selectedDate.value);
    sel.setHours(0, 0, 0, 0);
    return sel > today;
  }

  function isDuplicateHabitName(
    name: string,
    excludeId: number | null = null,
  ): boolean {
    return habits.value.some(
      (h: Habit) =>
        h.name.trim().toLowerCase() === name.trim().toLowerCase() &&
        h.id !== excludeId &&
        h.createdDate === selectedDate.value, // Only check same date
    );
  }

  function validateHabitName(
    name: string,
    excludeId: number | null = null,
  ): string {
    const trimmedName = name.trim();
    if (!trimmedName) {
      return 'Habit name cannot be empty';
    }
    if (isDuplicateHabitName(trimmedName, excludeId)) {
      return 'A habit with this name already exists';
    }
    return '';
  }

  function addHabit(): void {
    const name = newHabitName.value;
    error.value = validateHabitName(name);
    if (error.value) {
      setTimeout(() => {
        error.value = '';
      }, 3000);
      return;
    }

    try {
      loading.value = true;
      habits.value.push({
        id: Date.now(),
        name: name.trim(),
        createdDate: selectedDate.value,
      });
      newHabitName.value = '';
      showAddHabitMode.value = false;
      success.value = 'Habit added successfully';
      setTimeout(() => {
        success.value = '';
      }, 3000);
    } catch (err) {
      error.value = 'Failed to add habit';
      setTimeout(() => {
        error.value = '';
      }, 3000);
    } finally {
      loading.value = false;
    }
  }

  function editHabit({ id, name }: HabitEditData): void {
    error.value = validateHabitName(name, id);
    if (error.value) {
      setTimeout(() => {
        error.value = '';
      }, 3000);
      return;
    }

    const habit = habits.value.find((h: Habit) => h.id === id);
    if (habit) {
      habit.name = name.trim();
      success.value = 'Habit updated successfully';
      setTimeout(() => {
        success.value = '';
      }, 3000);
    }
  }

  function stopHabit(id: number): void {
    const habit = habits.value.find((h: Habit) => h.id === id);
    if (habit) {
      habit.stopDate = selectedDate.value;
      habit.resumeDate = null;
      success.value = 'Habit stopped successfully';
      setTimeout(() => {
        success.value = '';
      }, 3000);
    }
  }

  function resumeHabit(id: number): void {
    const habit = habits.value.find((h: Habit) => h.id === id);
    if (habit) {
      habit.resumeDate = selectedDate.value;
      success.value = 'Habit resumed successfully';
      setTimeout(() => {
        success.value = '';
      }, 3000);
    }
  }

  function isHabitStoppedOnDate(habit: Habit, date: DateString): boolean {
    if (!habit.stopDate) return false;
    if (habit.resumeDate && date >= habit.resumeDate) return false;
    return date >= habit.stopDate;
  }

  function deleteHabit(id: number): void {
    // Force reactivity by creating a new array
    habits.value = [...habits.value.filter((h: Habit) => h.id !== id)];

    // Clean up completion records
    Object.keys(completedHabitsByDay.value).forEach((date: string) => {
      if (completedHabitsByDay.value[date]) {
        completedHabitsByDay.value[date] = completedHabitsByDay.value[
          date
        ].filter((hid: number) => hid !== id);
      }
    });

    success.value = 'Habit deleted successfully';
    setTimeout(() => {
      success.value = '';
    }, 3000);
  }

  // toggle habit completion fo the selected day
  function toggleHabit(id: number): void {
    const date = selectedDate.value;
    if (!completedHabitsByDay.value[date]) {
      completedHabitsByDay.value[date] = [];
    }

    if (completedHabitsByDay.value[date].includes(id)) {
      // Uncheck
      completedHabitsByDay.value[date] = completedHabitsByDay.value[
        date
      ].filter((hid: number) => hid !== id);
    } else {
      // Check
      completedHabitsByDay.value[date].push(id);
    }
  }

  return {
    habits,
    completedHabits,
    isFutureDay,
    showAddHabitMode,
    newHabitName,
    error,
    success,
    loading,
    addHabit,
    editHabit,
    stopHabit,
    resumeHabit,
    deleteHabit,
    toggleHabit,
    selectedDate,
    isHabitStoppedOnDate,
    validateHabitName,
    isDuplicateHabitName,
  };
}
