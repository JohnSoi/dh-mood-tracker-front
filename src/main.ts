import {createApp} from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import {createPinia} from "pinia";
import './assets/styles/base.less';
import {router} from "@/routes";
import GlobalErrorProvider from "@/components/GlobalErrorProvider.vue";

const pinia = createPinia();
const app = createApp(App);

app.component('GlobalErrorProvider', GlobalErrorProvider);

app.use(pinia).use(router).mount('#app')
