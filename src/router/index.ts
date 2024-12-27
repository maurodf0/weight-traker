import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import SettingsView from '@/views/SettingsView.vue';
import BMIView from '@/views/BMIView.vue';
import TDEEView from '@/views/TDEEView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      alias: ['/home', '/same'],
      component: HomeView
    },
    {
         path: '/settings',
         name: 'settings',
         alias: ['/settings', '/settings'],
         component: SettingsView
    },
    {
      path: '/bmi',
      name: 'bmi',
      alias: ['/bmi', '/bmi'],
      component: BMIView
    },
    {
      path: '/tdee',
      name: 'tdee',
      alias: ['/tdee', '/tdee'],
      component: TDEEView   
    },
]
});

export default router;