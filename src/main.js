import { createApp } from 'vue';
import App from './App.vue';
import axios from 'axios';

// Set baseURL untuk axios
axios.defaults.baseURL = 'http://localhost:3000/articles'; // Sesuaikan dengan URL API Anda

const app = createApp(App);
app.config.globalProperties.$axios = axios;

app.mount('#app');
