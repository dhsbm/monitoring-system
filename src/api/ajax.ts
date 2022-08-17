import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'
import { camelizeKeys, decamelizeKeys } from 'humps'
// 引入进度条
import NProgress from 'nprogress'
// 引入进度条样式
import 'nprogress/nprogress.css'

const ajax = axios.create({
  baseURL: 'http://47.100.57.184:3333/', // 基础路径
  timeout: 6000, // 请求超时时间
})

// 添加请求拦截器
ajax.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    NProgress.start()
    //将token写入header
    const token = localStorage.getItem('token')
    if (token) {
      config.headers!['Authorization'] = token
    }
    config.data = decamelizeKeys(config.data) //将请求数据转为snake_case
    // console.log(config)
    return config
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
ajax.interceptors.response.use(
  (response: AxiosResponse) => {
    // 对响应数据做点什么
    NProgress.done()
    // console.log(response.data)
    response.data = camelizeKeys(response.data)
    return response.data
  },
  (error) => {
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)

export default ajax
