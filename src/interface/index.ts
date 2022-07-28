// 通用响应接口
export interface CommonResponse {
  code: number // 0表示成功，其余表示失败
  msg: string // 提示信息
}
// 通用日志信息
export interface Log {
  log_id: number
  kind: Kind
  time: number
  url: string
}
// 异常日志
export interface ErrLog extends Log {
  type: Type
  message: string
  stack: string
  selector: string
}
// 性能日志
export interface PreLog extends Log {
  dns: number
  fp: number
  fcp: number
  lcp: number
  dcl: number
  l: number
}
// 行为日志
export interface BehLog extends Log {
  duration: number
  ip: string
  area: Area
}
// 请求日志
export interface HTTPLog extends Log {
  res_time: number
  send_url: string
  way: string
  success: boolean
  status: number
  req_header: string
  req_params: string
  res_header: string
  res_body: string
}

// 日志类别枚举
export enum Kind {
  Err, // 异常
  Pre, // 性能
  Beh, // 行为
  HTTP, // 请求
}
// 异常类型枚举
export enum Type {
  JS, // JS
  SRC, // 资源
  HTTP, // 请求
  White, // 白屏
}
// 时间维度
export enum Time {
  h4, // 四小时，分度是15分钟
  d1, // 一天，分度为2小时
  d7, // 7天，分度为1天
  d14, // 14天，分度为1天
  d30, // 30天，分度为2天
}
// 浏览器映射
export enum Browser {
  未知 = 0,
  Chrome = 1,
  Edge = 2,
  Firefox = 3,
  IE = 4,
  Opera = 5,
  Safari = 6,
}
// 城市映射
export enum Area {
  未知 = 0,
  吉林 = 1,
  台湾 = 2,
  福建 = 3,
  甘肃 = 4,
  安徽 = 5,
  北京 = 6,
  江苏 = 7,
  上海 = 8,
  重庆 = 9,
  河北 = 10,
  河南 = 11,
  湖南 = 12,
  湖北 = 13,
  浙江 = 14,
  江西 = 15,
  陕西 = 16,
  山东 = 17,
  山西 = 18,
  黑龙江 = 19,
  青海 = 20,
  辽宁 = 21,
  云南 = 22,
  海南 = 23,
  四川 = 24,
  广东 = 25,
  广西 = 26,
  宁夏 = 27,
  西藏 = 28,
  新疆 = 29,
  内蒙古 = 30,
  香港 = 31,
  澳门 = 32,
  天津 = 33,
  贵州 = 34,
}
