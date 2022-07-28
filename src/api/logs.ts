import { ajax } from '.'
import { CommonResponse, Kind, Time, ErrLog, PreLog, BehLog, HTTPLog } from '@/interface'

// 查询日志完整信息
export function reqDetail(params: DetailParams): Promise<DetailResponse> {
  return ajax.post('/logs/detail', params)
}
interface DetailParams {
  web_id: number
  kind: Kind
  condition?: {
    url?: string
    time?: string
    type?: string
    message?: string
    dns?: string
    fp?: string
    fcp?: string
    lcp?: string
    dcl?: string
    l?: string
    duration?: string
    res_time?: string
    success?: boolean
    send_url?: string
    status?: number
  }
}
interface DetailResponse extends CommonResponse {
  total: number
  size: number
  page: number
  logs: Array<ErrLog | PreLog | BehLog | HTTPLog>
}

// 查询用户地区分布
export function reqArea(params: AreaParams): Promise<AreaResponse> {
  return ajax.post('/logs/area', params)
}
interface AreaParams {
  web_id: number
}
interface AreaResponse extends CommonResponse {
  area: number[]
}

// 查询浏览器类型概率分布
export function reqBrowser(params: BrowserParams): Promise<BrowserResponse> {
  return ajax.post('/logs/browser', params)
}
interface BrowserParams {
  web_id: number
}
interface BrowserResponse extends CommonResponse {
  browser: number[]
}

// 查询浏览器类型概率分布
export function reqAll(params: AllParams): Promise<AllResponse> {
  return ajax.post('/logs/all', params)
}
interface AllParams {
  web_id: number
}
interface AllResponse extends CommonResponse {
  err: number[][]
  pre: number[][]
  user1: number[][]
  user2: number[][]
  http1: number[][]
  http2: number[][]
  browser: number[]
  area: number[]
}

// 查询浏览器类型概率分布
export function reqStat(params: StatParams): Promise<StatResponse> {
  return ajax.post('/logs/stat', params)
}
interface StatParams {
  web_id: number
  kind: Kind
  time: Time
  index?: number // 区分行为日志和请求日志的两个表
}
interface StatResponse extends CommonResponse {
  data: number[][]
}
