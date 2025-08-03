<template>
  <nav>
    <button @click="goToPreviousDay">Previous</button>
    <CalendarNavigation :current-date="currentDate" />
    <button
      class="today-btn"
      :class="{ active: currentDate === today }"
      @click="goToToday"
    >
      Today
    </button>
    <button :disabled="isNextDayFuture" @click="goToNextDay">Next</button>
  </nav>
  <WeekNavigator
    :current-date="currentDate"
    :today="today"
    :week-starts-on="appConfig.weekStartsOn"
  />
  <div class="selected-date-display" role="status" aria-live="polite">
    <span class="selected-date-label">Selected Date:</span>
    <span class="selected-date-value" aria-label="Current selected date">{{
      formattedSelectedDate
    }}</span>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import type { DateString } from '@/types';
import CalendarNavigation from './CalendarNavigation.vue';
import WeekNavigator from './WeekNavigator.vue';
import appConfig from '../../config/appConfig';

const route = useRoute();
const router = useRouter();

const today = ref<DateString>(new Date().toISOString().slice(0, 10));
const currentDate = ref<DateString>(
  (route.params.date as string) || today.value,
);

const isNextDayFuture = computed((): boolean => {
  const current = new Date(currentDate.value);
  const next = new Date(current);
  next.setDate(current.getDate() + 1);
  const nextDateStr = next.toISOString().slice(0, 10);
  return nextDateStr > today.value;
});

// Format the selected date for display
const formattedSelectedDate = computed((): string => {
  const date = new Date(currentDate.value);

  try {
    return date.toLocaleDateString(appConfig.locale, {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch (error) {
    // Fallback to a simple format if locale fails
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }
});

function getTodayString(): DateString {
  return new Date().toISOString().slice(0, 10);
}

function isValidDateString(dateStr: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return false;
  const date = new Date(dateStr);
  return (
    !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === dateStr
  );
}

// Watch for route changes to keep `currentDate` in sync
watch(
  () => route.params.date,
  (newDate: string | string[] | undefined) => {
    const dateToUse = (newDate as string) || getTodayString();
    if (!isValidDateString(dateToUse) || dateToUse > today.value) {
      router.replace({ path: '/' });
      return;
    }
    currentDate.value = dateToUse;
  },
  { immediate: true },
);

// Navigation functions
function goToPreviousDay(): void {
  const current = new Date(currentDate.value);
  const prev = new Date(current);
  prev.setDate(current.getDate() - 1);
  router.push({ path: `/day/${prev.toISOString().slice(0, 10)}` });
}

function goToNextDay(): void {
  const current = new Date(currentDate.value);
  const next = new Date(current);
  next.setDate(current.getDate() + 1);
  router.push({ path: `/day/${next.toISOString().slice(0, 10)}` });
}

function goToToday(): void {
  router.push({ path: `/day/${today.value}` });
}
</script>

<style scoped>
nav {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.current-date-label {
  flex: 1;
  text-align: center;
  font-weight: 600;
  font-size: 1.1rem;
  color: #333;
  margin: 0 0.5rem;
  min-width: 120px;
}

button {
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  min-width: 80px;
  background: linear-gradient(45deg, #218838, #1ea085);
  color: white;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(33, 136, 56, 0.3);
}

button:hover:not(:disabled) {
  background: linear-gradient(45deg, #1e7e34, #1a5f3a);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(33, 136, 56, 0.4);
}

.today-btn {
  background: linear-gradient(45deg, #218838, #1ea085);
  color: #fff;
  opacity: 1;
  filter: none;
  cursor: pointer;
  border: none;
}

.today-btn:hover:not(:disabled) {
  background: linear-gradient(45deg, #1e7e34, #1a5f3a);
}

.today-btn.active {
  opacity: 0.7;
  cursor: default;
}

.today-btn.active:hover {
  transform: none;
  background: linear-gradient(45deg, #1e7e34, #1a5f3a);
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Mobile adjustments */
@media (width <= 768px) {
  nav {
    flex-flow: row nowrap;
    gap: 0.5rem;
  }

  .current-date-label {
    margin: 0.5rem 0;
    font-size: 1rem;
  }

  button {
    min-width: 70px;
    padding: 0.5rem;
    font-size: 0.9rem;
  }
}

.selected-date-display {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 0.75rem;
  padding: 0.5rem 0.75rem;
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  backdrop-filter: blur(5px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  max-width: 300px;
  margin-left: auto;
  margin-right: auto;
  opacity: 1;
  transition: all 0.2s ease;
}

.selected-date-display:hover {
  opacity: 1;
  background: rgba(255, 255, 255, 0.15);
}

.selected-date-label {
  font-weight: 500;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.8rem;
}

.selected-date-value {
  font-weight: 600;
  color: rgba(255, 255, 255, 0.95);
  font-size: 0.9rem;
}

/* Light mode adjustments */
@media (prefers-color-scheme: light) {
  .selected-date-display {
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.2);
  }

  .selected-date-label {
    color: #2c3e50;
  }

  .selected-date-value {
    color: #2c3e50;
  }
}

/* Mobile adjustments for selected date */
@media (width <= 768px) {
  .selected-date-display {
    margin-top: 0.5rem;
    padding: 0.4rem 0.6rem;
    max-width: 280px;
  }

  .selected-date-label {
    font-size: 0.75rem;
  }

  .selected-date-value {
    font-size: 0.8rem;
  }
}
</style>
