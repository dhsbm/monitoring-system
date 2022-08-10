import 'default-passive-events'
import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import { createPinia } from 'pinia'
import 'element-plus/dist/index.css'
// import './mock/mockServe' // 启动Mock服务器
import './tailwind.css'

const app = createApp(App)

app.use(router).use(createPinia()).mount('#app')
