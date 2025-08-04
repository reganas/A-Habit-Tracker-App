import type { Ref } from 'vue';

// Core habit data structure
export type Habit = {
  id: number;
  name: string;
  createdDate: string;
  stopDate?: string;
  resumeDate?: string | null;
};

export type CompletedHabitsByDay = {
  [date: string]: number[]; // Array of habit IDs completed on that date
};

export type HabitStore = {
  habits: Ref<Habit[]>;
  completedHabitsByDay: Ref<CompletedHabitsByDay>;
};

export type HabitFormData = {
  name: string;
  createdDate: string;
};

export type HabitEditData = {
  id: number;
  name: string;
};

export type DateNavigation = {
  selectedDate: string;
  isFutureDay: boolean;
};

export type HabitCompletion = {
  habitId: number;
  completed: boolean;
  date: string;
};

export type UIState = {
  showAddHabitMode: boolean;
  loading: boolean;
  error: string;
  success: string;
};

export type HabitItemProps = {
  habit: Habit;
  completed: boolean;
  disabled: boolean;
  isStopped: boolean;
};

export type HabitListProps = {
  habits: Habit[];
  currentDate: string;
  completedHabits: number[];
  isFutureDay: boolean;
  isHabitStoppedOnDate: (habit: Habit, date: string) => boolean;
};

export type HabitEvents = {
  toggle: (habitId: number) => void;
  edit: (data: HabitEditData) => void;
  stop: (habitId: number) => void;
  resume: (habitId: number) => void;
  delete: (habitId: number) => void;
};

// Utility types
export type DateString = string; // ISO date string (YYYY-MM-DD)
export type HabitId = number;
export type CompletionStatus = boolean;
