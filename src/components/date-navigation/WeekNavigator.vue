<template>
  <div class="week-container">
    <div
      v-for="day in weekDays"
      :key="day.date"
      :class="[
        'day-item',
        {
          active: day.date === currentDate,
          today: day.isToday,
          future: day.isFuture,
        },
      ]"
      @click="goToDate(day.date)"
    >
      <div class="day-name">{{ day.name }}</div>
      <div class="day-date">{{ day.dayNumber }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import type { DateString } from '@/types'
import appConfig from '../../config/appConfig'

interface Props {
  currentDate: DateString
  today: DateString
  weekStartsOn: number
}

const props = withDefaults(defineProps<Props>(), {
  currentDate: '',
  today: '',
  weekStartsOn: 0,
})

const router = useRouter()

interface WeekDay {
  date: DateString
  name: string
  dayNumber: number
  isToday: boolean
  isFuture: boolean
  isWeekend?: boolean
}

const weekDays = computed((): WeekDay[] => {
  const isMobile = window.innerWidth <= 768
  const current = new Date(props.currentDate)

  if (isMobile) {
    // Show 5 days: current day ± 2 days
    const days: WeekDay[] = []
    for (let i = -2; i <= 2; i += 1) {
      const date = new Date(current)
      date.setDate(current.getDate() + i)
      const dateStr = date.toISOString().slice(0, 10) as DateString
      const dayName = date.toLocaleDateString(appConfig.locale, {
        weekday: 'short',
      })
      const dayNumber = date.getDate()

      days.push({
        date: dateStr,
        name: dayName,
        dayNumber,
        isToday: dateStr === props.today,
        isFuture: dateStr > props.today,
      })
    }
    return days
  }

  // Desktop: show full week
  const startOfWeek = new Date(current)
  const dayOfWeek = current.getDay()
  const diff = props.weekStartsOn - dayOfWeek
  startOfWeek.setDate(current.getDate() + diff)

  const allDays: WeekDay[] = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(startOfWeek)
    date.setDate(startOfWeek.getDate() + i)
    const dateStr = date.toISOString().slice(0, 10) as DateString
    const dayName = date.toLocaleDateString(appConfig.locale, {
      weekday: 'short',
    })
    const dayNumber = date.getDate()
    const dayOfWeekForDay = date.getDay()
    const isWeekend = dayOfWeekForDay === 0 || dayOfWeekForDay === 6

    return {
      date: dateStr,
      name: dayName,
      dayNumber,
      isToday: dateStr === props.today,
      isFuture: dateStr > props.today,
      isWeekend,
    }
  })

  return appConfig.showWeekends
    ? allDays
    : allDays.filter((day: WeekDay) => !day.isWeekend)
})

function goToDate(date: DateString): void {
  router.push({ path: `/day/${date}` })
}
</script>

<style scoped>
.week-container {
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
  justify-content: center;
}

.day-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem;
  cursor: pointer;
  min-width: 40px;
  transition: background-color 0.2s;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.day-item:hover:not(.future) {
  background-color: #f0f0f0;
}

.day-item.active {
  background-color: #007bff;
  color: white;
}

.day-item.today {
  font-weight: bold;
  border: 2px solid #28a745;
}

.day-item.future {
  opacity: 0.5;
  cursor: not-allowed;
}

.day-name {
  font-size: 0.8rem;
  margin-bottom: 0.2rem;
}

.day-date {
  font-size: 0.9rem;
}

@media (prefers-color-scheme: dark) {
  .day-item:hover:not(.future) {
    background-color: #333;
  }
}
</style>
