import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './mock/mockServe' // 启动Mock服务器

createApp(App).use(router).use(createPinia()).use(ElementPlus).mount('#app')
