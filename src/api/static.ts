import axios from 'axios'
import { CommonResponse } from '@/interface'

interface MapResponse extends CommonResponse {
  data: string
}

// 请求中国地图数据
export function reqMap(): Promise<MapResponse> {
  return axios.get('/china.json')
}
