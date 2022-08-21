import 'default-passive-events'
import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import { createPinia } from 'pinia'
// import './mock/mockServe' // 启动Mock服务器
// import 'element-plus/dist/index.css' // 生产环境下，css预下载
import './tailwind.css'
import { reqCSS, reqMap } from '@/api'
const app = createApp(App)

app.use(router).use(createPinia()).mount('#app')
// 生产环境下：异步下载element-plus.css

new PerformanceObserver(function (
  entryList: PerformanceObserverEntryList,
  observe: PerformanceObserver
) {
  reqCSS().then((res) => {
    const link = document.createElement('style')
    link.innerText = res.data
    document.head.insertBefore(link, document.head.firstChild)
  })
  // 预加载地图数据
  reqMap()
  observe.disconnect()
}).observe({ entryTypes: ['largest-contentful-paint'] })
