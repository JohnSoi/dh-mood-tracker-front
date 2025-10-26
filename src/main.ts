import {createApp} from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import {createPinia} from "pinia";
import './assets/styles/base.less';
import {router} from "@/routes";

const pinia = createPinia();

createApp(App).use(pinia).use(router).mount('#app')
