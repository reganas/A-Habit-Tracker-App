// Core habit data structure
export interface Habit {
    id: number
    name: string
    createdDate: string
    stopDate?: string
    resumeDate?: string
  }

// Completed habits tracking by date
export interface CompletedHabitsByDay {
    [date: string]: number[] // Array of habit IDs completed on that date
  }

// Habit store state
export interface HabitStore {
    habits: Habit[]
    completedHabitsByDay: CompletedHabitsByDay
  }

// Form data for creating/editing habits
export interface HabitFormData {
    name: string
    createdDate: string
  }

// Habit editing data
export interface HabitEditData {
    id: number
    name: string
  }

// Date navigation
export interface DateNavigation {
    selectedDate: string
    isFutureDay: boolean
  }

// Habit completion status
export interface HabitCompletion {
    habitId: number
    completed: boolean
    date: string
  }

// UI state management
export interface UIState {
    showAddHabitMode: boolean
    loading: boolean
    error: string
    success: string
  }
  
// Component props
export interface HabitItemProps {
    habit: Habit
    completed: boolean
    disabled: boolean
    isStopped: boolean
  }

  export interface HabitListProps {
    habits: Habit[]
    currentDate: string
    completedHabits: number[]
    isFutureDay: boolean
    isHabitStoppedOnDate: (habit: Habit, date: string) => boolean
  }

// Event handlers
export interface HabitEvents {
    toggle: (habitId: number) => void
    edit: (data: HabitEditData) => void
    stop: (habitId: number) => void
    resume: (habitId: number) => void
    delete: (habitId: number) => void
  }

// Utility types
export type DateString = string // ISO date string (YYYY-MM-DD)
export type HabitId = number
export type CompletionStatus = boolean