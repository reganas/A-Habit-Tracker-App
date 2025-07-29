import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const routes = [
  {
    path: '/',
    redirect: () => {
      const today = new Date().toISOString().slice(0, 10);
      return `/day/${today}`;
    },
  },
  { path: '/day/:date', name: 'Day', component: HomeView },
  {
    path: '/:pathMatch(.*)*',
    redirect: () => {
      const today = new Date().toISOString().slice(0, 10);
      return `/day/${today}`;
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
