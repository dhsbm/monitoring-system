import axios from 'axios'
// 引入进度条
import NProgress from 'nprogress'
// 引入进度条样式
import 'nprogress/nprogress.css'

// 使用自定义配置新建一个 axios 实例
const ajax = axios.create({
  baseURL: '/mock', // 基础路径
  timeout: 5000, // 请求超时时间
})

// 添加请求拦截器
ajax.interceptors.request.use(
  (config) => {
    NProgress.start() // 显示进度条
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 添加响应拦截器
ajax.interceptors.response.use(
  (response) => {
    NProgress.done() // 隐藏进度条
    return response.data // 取data
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default ajax
