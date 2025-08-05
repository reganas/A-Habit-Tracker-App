type AppConfig = {
  weekStartsOn: number;
  locale: string;
  showWeekends: boolean;
  minDate: string;
  maxHabitNameLength: number;
  notificationTimeout: number;
};

const userLocale: string = navigator.language || 'en-US';

const appConfig: AppConfig = {
  weekStartsOn: 0,
  locale: userLocale,
  showWeekends: true,
  minDate: '2022-01-01',
  maxHabitNameLength: 20,
  notificationTimeout: 3000,
};

export default appConfig;
