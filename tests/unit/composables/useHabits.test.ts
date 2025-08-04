import { describe, it, expect, beforeEach } from 'vitest';
import { ref } from 'vue';
import useHabits from '../../../src/composables/useHabits';
import type { Habit, HabitStore } from '../../../src/types';

describe('useHabits - Habit Name Validation', () => {
  let habitStore: HabitStore;

  beforeEach(() => {
    habitStore = {
      habits: ref<Habit[]>([]),
      completedHabitsByDay: ref({}),
    };
  });

  it('should return error for empty habit name', () => {
    const { validateHabitName } = useHabits(habitStore, '2024-01-01');
    expect(validateHabitName('')).toBe('Habit name cannot be empty');
    expect(validateHabitName('   ')).toBe('Habit name cannot be empty');
  });

  it('should return error for duplicate habit name', () => {
    habitStore.habits.value = [
      { id: 1, name: 'Exercise', createdDate: '2024-01-01' },
    ];
    const { validateHabitName } = useHabits(habitStore, '2024-01-01');
    expect(validateHabitName('Exercise')).toBe(
      'A habit with this name already exists',
    );
    expect(validateHabitName('exercise')).toBe(
      'A habit with this name already exists',
    );
  });

  it('should return empty string for valid habit name', () => {
    habitStore.habits.value = [
      { id: 1, name: 'Exercise', createdDate: '2024-01-01' },
    ];
    const { validateHabitName } = useHabits(habitStore, '2024-01-01');
    expect(validateHabitName('Reading')).toBe('');
    expect(validateHabitName('Meditation')).toBe('');
  });
});

describe('Habit Completion Logic', () => {
  let habitStore: HabitStore;

  beforeEach(() => {
    habitStore = {
      habits: ref<Habit[]>([]),
      completedHabitsByDay: ref({}),
    };
  });

  it('should toggle habit completion for a specific date', () => {
    const { toggleHabit, completedHabits } = useHabits(
      habitStore,
      '2024-01-01',
    );

    habitStore.habits.value = [
      { id: 1, name: 'Exercise', createdDate: '2024-01-01' },
    ];

    expect(completedHabits()).toEqual([]);

    toggleHabit(1);
    expect(completedHabits()).toEqual([1]);

    toggleHabit(1);
    expect(completedHabits()).toEqual([]);
  });

  it('should track multiple completed habits for the same date', () => {
    const { toggleHabit, completedHabits } = useHabits(
      habitStore,
      '2024-01-01',
    );

    habitStore.habits.value = [
      { id: 1, name: 'Exercise', createdDate: '2024-01-01' },
      { id: 2, name: 'Reading', createdDate: '2024-01-01' },
    ];

    toggleHabit(1);
    toggleHabit(2);

    expect(completedHabits()).toEqual([1, 2]);
  });

  it('should maintain completion state when habits are added/removed', () => {
    const { toggleHabit, completedHabits } = useHabits(
      habitStore,
      '2024-01-01',
    );

    habitStore.habits.value = [
      { id: 1, name: 'Exercise', createdDate: '2024-01-01' },
    ];
    toggleHabit(1);
    expect(completedHabits()).toEqual([1]);

    habitStore.habits.value.push({
      id: 2,
      name: 'Reading',
      createdDate: '2024-01-01',
    });

    expect(completedHabits()).toEqual([1]);
  });

  it('should clean up completion records when habit is deleted', () => {
    const { toggleHabit, deleteHabit, completedHabits } = useHabits(
      habitStore,
      '2024-01-01',
    );

    habitStore.habits.value = [
      { id: 1, name: 'Exercise', createdDate: '2024-01-01' },
    ];

    toggleHabit(1);
    expect(completedHabits()).toEqual([1]);

    deleteHabit(1);

    expect(completedHabits()).toEqual([]);
  });

  it('should handle empty completion array for new dates', () => {
    const { completedHabits } = useHabits(habitStore, '2024-01-01');

    expect(completedHabits()).toEqual([]);
  });
});
