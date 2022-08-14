import { ElMessage } from 'element-plus'
import { createRouter, createWebHashHistory } from 'vue-router'
// import Layout from '@/layout/Layout.vue'
// import Login from 'pages/login/Login.vue'
import { useUserStore, useWebStore } from '@/store'

const routes = [
  { path: '/login', name: 'Login', component: () => import('pages/login/Login.vue') },
  {
    path: '/',
    name: '/',
    component: () => import('@/layout/Layout.vue'),
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

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  const webStore = useWebStore()
  // 未登录状态下，尝试根据token获取用户信息，未成功获取则跳至登录页
  if (!userStore.logined) {
    if (to.path != '/login') {
      userStore
        .getInfo()
        .then(() => {
          webStore.getWebs()
          next()
        })
        .catch(() => {
          router.push('/login')
        })
    } else {
      next()
    }
  } else {
    // 当前用户尚未创建网站，跳回首页
    if (webStore.webId == -1 && to.path != '/login' && to.path != '/home') {
      router.push('/home')
      ElMessage({
        message: '请先添加网站',
        type: 'warning',
      })
    }
    next()
  }
})

export default router
