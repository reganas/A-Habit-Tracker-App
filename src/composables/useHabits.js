import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

export default function useHabits(habitStore) {
  const { habits, completedHabitsByDay } = habitStore;
  const showAddHabitMode = ref(false);
  const newHabitName = ref('');
  const error = ref('');
  const success = ref('');
  const loading = ref(false);
  const route = useRoute();

  const selectedDate = ref(
    route.params.date || new Date().toISOString().slice(0, 10),
  );

  // Keep selectedDate in sync with the route
  watch(
    () => route.params.date,
    newDate => {
      selectedDate.value = newDate || new Date().toISOString().slice(0, 10);
    },
    { immediate: true },
  );

  function completedHabits() {
    return completedHabitsByDay.value[selectedDate.value] || [];
  }

  // Computed; isFutureDay
  function isFutureDay() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const sel = new Date(selectedDate.value);
    sel.setHours(0, 0, 0, 0);
    return sel > today;
  }

  function isDuplicateHabitName(name, excludeId = null) {
    return habits.value.some(
      h =>
        h.name.trim().toLowerCase() === name.trim().toLowerCase() &&
        h.id !== excludeId,
    );
  }

  function validateHabitName(name, excludeId = null) {
    const trimmedName = name.trim();
    if (!trimmedName) {
      return 'Habit name cannot be empty';
    }
    if (isDuplicateHabitName(trimmedName, excludeId)) {
      return 'A habit with this name already exists';
    }
    return '';
  }

  function addHabit() {
    const name = newHabitName.value;
    error.value = validateHabitName(name);
    if (error.value) return;

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
    } finally {
      loading.value = false;
    }
  }

  function editHabit({ id, name }) {
    error.value = validateHabitName(name, id);
    if (error.value) {
      setTimeout(() => {
        error.value = '';
      }, 3000);
      return;
    }

    const habit = habits.value.find(h => h.id === id);
    if (habit) {
      habit.name = name.trim();
      success.value = 'Habit updated successfully';
      setTimeout(() => {
        success.value = '';
      }, 3000);
    }
  }

  function stopHabit(id) {
    const habit = habits.value.find(h => h.id === id);
    if (habit) {
      habit.stopDate = selectedDate.value;
      habit.resumeDate = null;
      success.value = 'Habit stopped successfully';
      setTimeout(() => {
        success.value = '';
      }, 3000);
    }
  }

  function resumeHabit(id) {
    const habit = habits.value.find(h => h.id === id);
    if (habit) {
      habit.resumeDate = selectedDate.value;
      success.value = 'Habit resumed successfully';
      setTimeout(() => {
        success.value = '';
      }, 3000);
    }
  }

  function isHabitStoppedOnDate(habit, date) {
    if (!habit.stopDate) return false;
    if (habit.resumeDate && date >= habit.resumeDate) return false;
    return date >= habit.stopDate;
  }

  function deleteHabit(id) {
    // Force reactivity by creating a new array
    habits.value = [...habits.value.filter(h => h.id !== id)];

    // Clean up completion records
    Object.keys(completedHabitsByDay.value).forEach(date => {
      if (completedHabitsByDay.value[date]) {
        completedHabitsByDay.value[date] = completedHabitsByDay.value[
          date
        ].filter(hid => hid !== id);
      }
    });
  }

  // toggle habit completion fo the selected day
  function toggleHabit(id) {
    const date = selectedDate.value;
    if (!completedHabitsByDay.value[date]) {
      completedHabitsByDay.value[date] = [];
    }

    if (completedHabitsByDay.value[date].includes(id)) {
      // Uncheck
      completedHabitsByDay.value[date] = completedHabitsByDay.value[
        date
      ].filter(hid => hid !== id);
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
  };
}
