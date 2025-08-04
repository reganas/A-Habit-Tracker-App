import type { Ref } from 'vue';

// Core habit data structure
export interface Habit {
  id: number;
  name: string;
  createdDate: string;
  stopDate?: string;
  resumeDate?: string | null;
}

export interface CompletedHabitsByDay {
  [date: string]: number[]; // Array of habit IDs completed on that date
}

export interface HabitStore {
  habits: Ref<Habit[]>;
  completedHabitsByDay: Ref<CompletedHabitsByDay>;
}

export interface HabitFormData {
  name: string;
  createdDate: string;
}

export interface HabitEditData {
  id: number;
  name: string;
}

export interface DateNavigation {
  selectedDate: string;
  isFutureDay: boolean;
}

export interface HabitCompletion {
  habitId: number;
  completed: boolean;
  date: string;
}

export interface UIState {
  showAddHabitMode: boolean;
  loading: boolean;
  error: string;
  success: string;
}

export interface HabitItemProps {
  habit: Habit;
  completed: boolean;
  disabled: boolean;
  isStopped: boolean;
}

export interface HabitListProps {
  habits: Habit[];
  currentDate: string;
  completedHabits: number[];
  isFutureDay: boolean;
  isHabitStoppedOnDate: (habit: Habit, date: string) => boolean;
}

export interface HabitEvents {
  toggle: (habitId: number) => void;
  edit: (data: HabitEditData) => void;
  stop: (habitId: number) => void;
  resume: (habitId: number) => void;
  delete: (habitId: number) => void;
}

// Utility types
export type DateString = string; // ISO date string (YYYY-MM-DD)
export type HabitId = number;
export type CompletionStatus = boolean;
