<template>
  <div :class="{ loading }">
    <DayNavigation />
    <header>
      <h1>Habit Tracker</h1>
    </header>

    <main>
      <!-- Error and Success Messages -->
      <div v-if="error" class="error" role="alert" aria-live="polite">
        {{ error }}
      </div>
      <div v-if="success" class="success" role="status" aria-live="polite">
        {{ success }}
      </div>
      <div class="add-habit-section">
        <button
          v-if="!showAddHabitMode"
          title="Add a habit"
          class="add-habit-btn"
          aria-label="Add new habit"
          @click="showAddHabitMode = true"
        >
          <i class="fa fa-plus" aria-hidden="true"></i>
          <span class="sr-only">Add habit</span>
        </button>

        <form
          v-if="showAddHabitMode"
          class="add-habit-form"
          @submit.prevent="addHabit"
        >
          <label for="habit-name" class="sr-only">Habit name</label>
          <input
            id="habit-name"
            v-model="newHabitName"
            type="text"
            maxlength="30"
            placeholder="Enter a habit name"
            required
            autofocus
            :disabled="loading"
          />
          <button
            type="submit"
            :disabled="loading || !newHabitName.trim()"
            aria-label="Add habit"
          >
            <i class="fa fa-plus" aria-hidden="true"></i>
          </button>
          <button
            type="button"
            aria-label="Cancel"
            @click="
              showAddHabitMode = false;
              error = '';
            "
          >
            <i class="fa fa-times" aria-hidden="true"></i>
          </button>
        </form>
      </div>
      <HabitList
        :habits="habits"
        :current-date="selectedDate"
        :completed-habits="completedHabits()"
        :is-future-day="isFutureDay()"
        :is-habit-stopped-on-date="isHabitStoppedOnDate"
        @toggle="toggleHabit"
        @edit="editHabit"
        @stop="stopHabit"
        @resume="resumeHabit"
        @delete="deleteHabit"
      />
    </main>
  </div>
</template>

<script setup>
import useHabits from '../composables/useHabits';
import useHabitStore from '../store/habitStore';
import DayNavigation from '../components/date-navigation/DayNavigation.vue';
import HabitList from '../components/habit-list/HabitList.vue';

const habitStore = useHabitStore();
const {
  habits,
  completedHabits,
  isFutureDay,
  showAddHabitMode,
  newHabitName,
  error,
  success,
  loading,
  addHabit,
  toggleHabit,
  editHabit,
  stopHabit,
  resumeHabit,
  deleteHabit,
  selectedDate,
  isHabitStoppedOnDate,
} = useHabits(habitStore);
</script>

<style scoped>
.add-habit-section {
  margin-top: 2rem;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

.add-habit-btn {
  width: 4rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  background: linear-gradient(45deg, #218838, #1ea085);
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgb(33 136 56 / 40%);
}

.add-habit-btn:hover:not(:disabled) {
  background: linear-gradient(45deg, #1e7e34, #1a5f3a);
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 6px 25px rgb(33 136 56 / 60%);
}

.add-habit-form {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 1rem;
}

.add-habit-form input {
  flex: 1;
  min-width: 200px;
  max-width: 300px;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
}

.add-habit-form button {
  padding: 0.75rem;
  min-width: 44px;
}

/* Mobile adjustments */
@media (width <= 768px) {
  .add-habit-form {
    flex-direction: row;
    align-items: center;
  }

  .add-habit-form input {
    min-width: auto;
    max-width: none;
  }

  .add-habit-form button {
    align-self: center;
  }

  .add-habit-btn {
    width: 3.5rem;
    height: 3.5rem;
    font-size: 1.5rem;
  }
}
</style>
