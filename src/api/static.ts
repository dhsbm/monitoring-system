import axios from 'axios'
import { CommonResponse } from '@/interface'

interface StaticResponse extends CommonResponse {
  data: string
}

// 请求中国地图数据
export function reqMap(): Promise<StaticResponse> {
  return axios.get('/china.json')
}

// 请求element-plus.css
export function reqCSS(): Promise<StaticResponse> {
  return axios.get('/element.css')
}
