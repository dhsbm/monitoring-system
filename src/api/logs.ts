import { ajax } from '.'
import { CommonResponse, Kind, Time, ErrLog, PerLog, BehLog, HTTPLog } from '@/interface'

// 查询所有数据
export function reqAll(params: AllParams): Promise<AllResponse> {
  return ajax.post('/logs/all', params)
}
interface AllParams {
  webId: number
  endTime: number
}
interface AllResponse extends CommonResponse {
  data: {
    err: number[][]
    per: number[][]
    user1: number[][]
    user2: number[][]
    http1: number[][]
    http2: number[][]
    browser: number[]
    area: number[]
  }
}

// 查询日志统计信息
export function reqStat(params: StatParams): Promise<StatResponse> {
  return ajax.post('/logs/stat', params)
}
interface StatParams {
  webId: number
  kind: Kind
  endTime: number
  time: Time
  index?: number // 区分行为日志和请求日志的两个表
}
interface StatResponse extends CommonResponse {
  data: number[][]
}

// 请求错误日志
export function reqErr(params: ErrParams): Promise<ErrResponse> {
  return ajax.post('/logs/err', params)
}
interface ErrParams {
  webId: number
  page: number
  condition?: {
    url?: string
    time?: string
    type?: string
    message?: string
  }
}
interface ErrResponse extends CommonResponse {
  data: {
    total: number
    size: number
    page: number
    logs: Array<ErrLog>
  }
}
// 请求性能日志
export function reqPer(params: PerParams): Promise<PerResponse> {
  return ajax.post('/logs/per', params)
}
interface PerParams {
  webId: number
  page: number
  condition?: {
    url?: string
    time?: string
    dns?: string
    fp?: string
    fcp?: string
    lcp?: string
    dcl?: string
    l?: string
  }
}
interface PerResponse extends CommonResponse {
  data: {
    total: number
    size: number
    page: number
    logs: Array<PerLog>
  }
}
// 请求行为日志
export function reqBeh(params: BehParams): Promise<BehResponse> {
  return ajax.post('/logs/beh', params)
}
interface BehParams {
  webId: number
  page: number
  condition?: {
    url?: string
    time?: string
    duration?: string
    ip?: string
  }
}
interface BehResponse extends CommonResponse {
  data: {
    total: number
    size: number
    page: number
    logs: Array<BehLog>
  }
}
// 请求网络日志
export function reqHttp(params: HttpParams): Promise<HttpResponse> {
  return ajax.post('/logs/http', params)
}
interface HttpParams {
  webId: number
  page: number
  condition?: {
    url?: string
    time?: string
    resTime?: string
    success?: string
    sendUrl?: string
  }
}
interface HttpResponse extends CommonResponse {
  data: {
    total: number
    size: number
    page: number
    logs: Array<HTTPLog>
  }
}
