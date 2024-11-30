import { createApp } from 'vue'
import './style.scss'
import './assets/style/tailwind.scss'; // Import Tailwind CSS
import App from './App.vue'
import router from './router'; // Import router
import pinia from './store'; // Import Pinia

createApp(App).use(router).use(pinia).mount('#app')
