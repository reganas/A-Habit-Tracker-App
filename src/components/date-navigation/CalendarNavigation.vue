<script setup lang="ts">
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import type { DateString } from '@/types';
import appConfig from '../../config/appConfig';

interface Props {
  currentDate: DateString;
}

const props = withDefaults(defineProps<Props>(), {
  currentDate: () => new Date().toISOString().slice(0, 10),
});

const router = useRouter();
const date = ref<Date>(new Date(props.currentDate));

watch(
  () => props.currentDate,
  (val: DateString) => {
    if (val) date.value = new Date(val);
  },
);

function onDateSelect(val: Date | null): void {
  if (val && val <= new Date()) {
    router.push({ path: `/day/${val.toISOString().slice(0, 10)}` });
  }
}
</script>

<template>
  <div class="calendar-nav">
    <Datepicker
      v-model="date"
      :max-date="new Date()"
      :min-date="appConfig.minDate"
      :format="'yyyy-MM-dd'"
      input-class-name="current-date"
      popper-class-name="calendar-popup"
      :enable-time-picker="false"
      @update:model-value="onDateSelect"
    >
      <template #trigger>
        <button class="calendar-btn" type="button" aria-label="Open calendar">
          <i class="fa fa-calendar" aria-hidden="true"></i>
        </button>
      </template>
    </Datepicker>
  </div>
</template>

<style scoped>
.calendar-btn {
  background: linear-gradient(45deg, #218838, #1ea085);
  color: white;
  border: none;
  padding: 0.5rem;
  border-radius: 8px;
  cursor: pointer;
  min-width: 44px;
  min-height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
}

.calendar-btn:hover {
  background: linear-gradient(45deg, #1e7e34, #1a5f3a);
}
</style>
