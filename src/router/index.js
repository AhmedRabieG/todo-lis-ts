import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'), // Lazy load the Home view
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/about.vue'), // Lazy load the About view
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
