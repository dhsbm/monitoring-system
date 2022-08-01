import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/layout/Layout.vue'
import Login from 'pages/login/Login.vue'

// 2. 定义一些路由
// 每个路由都需要映射到一个组件。
// 我们后面再讨论嵌套路由。
const routes = [
  { path: '/login', name: 'Login', component: Login },
  {
    path: '/',
    name: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('pages/home/Home.vue'),
      },
      {
        path: 'overview',
        name: 'Overview',
        component: () => import('pages/overview/Overview.vue'),
      },
      {
        path: 'error',
        name: 'Error',
        component: () => import('pages/error/Error.vue'),
      },
      {
        path: 'performance',
        name: 'Performance',
        component: () => import('pages/performance/Performance.vue'),
      },
      {
        path: 'behavior',
        name: 'Behavior',
        component: () => import('pages/behavior/Behavior.vue'),
      },
      {
        path: 'http',
        name: 'Http',
        component: () => import('pages/http/Http.vue'),
      },
    ],
  },
]

// 3. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单
const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
})

export default router
