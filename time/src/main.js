import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import vant from 'vant';
import './api/mock';

const app = createApp(App);
app.use(createPinia());
app.use(vant);
app.mount('#app');
