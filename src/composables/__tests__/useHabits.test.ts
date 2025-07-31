import { describe, it, expect, beforeEach } from 'vitest'
import { ref } from 'vue'
import useHabits from '../useHabits'
import type { Habit, HabitStore } from '../../types'

describe('useHabits - Habit Name Validation', () => {
  let habitStore: HabitStore

  beforeEach(() => {
    // Create a fresh habit store for each test
    habitStore = {
      habits: ref<Habit[]>([]),
      completedHabitsByDay: ref<Record<string, number[]>>({})
    }
  })

  describe('validateHabitName', () => {
    it('should return error for empty habit name', () => {
      const { validateHabitName } = useHabits(habitStore)
      
      expect(validateHabitName('')).toBe('Habit name cannot be empty')
      expect(validateHabitName('   ')).toBe('Habit name cannot be empty')
      expect(validateHabitName('\t\n')).toBe('Habit name cannot be empty')
    })

    it('should return error for duplicate habit name', () => {
      // Add existing habits
      habitStore.habits.value = [
        { id: 1, name: 'Exercise', createdDate: '2024-01-01' },
        { id: 2, name: 'Reading', createdDate: '2024-01-01' }
      ]

      const { validateHabitName } = useHabits(habitStore)
      
      expect(validateHabitName('Exercise')).toBe('A habit with this name already exists')
      expect(validateHabitName('exercise')).toBe('A habit with this name already exists')
      expect(validateHabitName('  Exercise  ')).toBe('A habit with this name already exists')
      expect(validateHabitName('READING')).toBe('A habit with this name already exists')
    })

    it('should return empty string for valid habit name', () => {
      const { validateHabitName } = useHabits(habitStore)
      
      expect(validateHabitName('New Habit')).toBe('')
      expect(validateHabitName('  Valid Habit  ')).toBe('') // Should trim whitespace
      expect(validateHabitName('Unique Name')).toBe('')
    })

    it('should allow editing habit with same name (exclude current habit)', () => {
      // Add existing habit
      habitStore.habits.value = [
        { id: 1, name: 'Exercise', createdDate: '2024-01-01' }
      ]

      const { validateHabitName } = useHabits(habitStore)
      
      // Should allow editing habit with same name (exclude ID 1)
      expect(validateHabitName('Exercise', 1)).toBe('')
      
      // Should still prevent duplicate with other habits
      expect(validateHabitName('Exercise', 2)).toBe('A habit with this name already exists')
    })

    it('should handle case-insensitive duplicate detection', () => {
      habitStore.habits.value = [
        { id: 1, name: 'Exercise', createdDate: '2024-01-01' }
      ]

      const { validateHabitName } = useHabits(habitStore)
      
      expect(validateHabitName('exercise')).toBe('A habit with this name already exists')
      expect(validateHabitName('EXERCISE')).toBe('A habit with this name already exists')
      expect(validateHabitName('Exercise')).toBe('A habit with this name already exists')
    })
  })

  describe('isDuplicateHabitName', () => {
    it('should detect duplicate names', () => {
      habitStore.habits.value = [
        { id: 1, name: 'Exercise', createdDate: '2024-01-01' },
        { id: 2, name: 'Reading', createdDate: '2024-01-01' }
      ]

      const { isDuplicateHabitName } = useHabits(habitStore)
      
      expect(isDuplicateHabitName('Exercise')).toBe(true)
      expect(isDuplicateHabitName('exercise')).toBe(true)
      expect(isDuplicateHabitName('Reading')).toBe(true)
      expect(isDuplicateHabitName('New Habit')).toBe(false)
    })

    it('should exclude specified habit ID when checking duplicates', () => {
      habitStore.habits.value = [
        { id: 1, name: 'Exercise', createdDate: '2024-01-01' },
        { id: 2, name: 'Reading', createdDate: '2024-01-01' }
      ]

      const { isDuplicateHabitName } = useHabits(habitStore)
      
      // Should not be duplicate when editing the same habit
      expect(isDuplicateHabitName('Exercise', 1)).toBe(false)
      expect(isDuplicateHabitName('Reading', 2)).toBe(false)
      
      // Should still be duplicate when editing different habit
      expect(isDuplicateHabitName('Exercise', 2)).toBe(true)
      expect(isDuplicateHabitName('Reading', 1)).toBe(true)
    })

    it('should handle empty habits array', () => {
      const { isDuplicateHabitName } = useHabits(habitStore)
      
      expect(isDuplicateHabitName('Any Name')).toBe(false)
      expect(isDuplicateHabitName('Exercise')).toBe(false)
    })
  })
})