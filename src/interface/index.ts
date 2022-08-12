// 通用响应接口
export interface CommonResponse {
  code: number // 0表示成功，其余表示失败
  msg: string // 提示信息
}
// 通用日志信息
export interface Log {
  logId: number
  kind?: Kind
  time: number // 开始时间
  url: string // 页面路径
  total: number
  logs: Array<Object>
}
// 异常日志
export interface ErrLog extends Log {
  type: Type
  message: string // 异常信息
  stack: string // 触发异常的行为
  selector: string // 触发异常的元素
}
// 性能日志
export interface PerLog extends Log {
  dns: number // DNS解析
  fp: number // 首屏渲染
  fcp: number // 内容渲染
  lcp: number // 最大内容渲染
  dcl: number // dom 完全渲染
  l: number // onload
}
// 行为日志
export interface BehLog extends Log {
  duration: number // 停留时间
  ip: string
  area: Area
  // brower:Browser
}
// 请求日志
export interface HTTPLog extends Log {
  resTime: number
  sendUrl: string
  way: string
  success: number
  status: number // 状态码
  // reqHeader: string
  // reqParams: string
  // resHeader: string
  resBody: string
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
// 网站信息
export interface WebInfo {
  webId: number
  url: string
  title: string
  warn: string
}
