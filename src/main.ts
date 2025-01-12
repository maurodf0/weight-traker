import './assets/main.css'

import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import Meta from 'vue-meta';


createApp(App)
  .use(router)
  .use(Meta)
  .mount('#app')
