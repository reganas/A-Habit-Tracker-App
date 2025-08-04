interface AppConfig {
  weekStartsOn: number;
  locale: string;
  showWeekends: boolean;
  minDate: string;
  maxHabitNameLength: number;
}

const userLocale: string = navigator.language || 'en-US';

const appConfig: AppConfig = {
  weekStartsOn: 0,
  locale: userLocale,
  showWeekends: true,
  minDate: '2022-01-01',
  maxHabitNameLength: 30,
};

export default appConfig;
