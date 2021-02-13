import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Watchlist from '../views/Watchlist.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Watchlist',
    component: Watchlist,
  },
  {
    path: '/portfolio',
    name: 'Portfolio',
    component: () => import('../views/Portfolio.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
