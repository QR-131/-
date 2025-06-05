import { createRouter, createWebHashHistory } from 'vue-router';
import TimerPage from '../pages/Index.vue';

const routes = [
  {
    path: '/',
    name: 'Timer',
    component: TimerPage
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
