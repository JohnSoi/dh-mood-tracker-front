import {createApp} from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import {createPinia} from "pinia";
import './assets/styles/base.less';

const pinia = createPinia();

createApp(App).use(pinia).mount('#app')
