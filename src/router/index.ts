import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import SettingsView from '@/views/SettingsView.vue';
import BMIView from '@/views/BMIView.vue';
import TDEEView from '@/views/TDEEView.vue';
import WeightView from '@/views/WeightView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      alias: ['/home'],
      component: HomeView
    },
    {
      path: '/weight',
      name: 'weight',
      component: WeightView
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