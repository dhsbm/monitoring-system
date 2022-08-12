import { Time } from '@/interface'

// 通用数据与函数

// 时间处理

const timeRange = [
  4 * 3600 * 1000, // 4h
  24 * 3600 * 1000, // 1d
  7 * 24 * 3600 * 1000, // 7d
  14 * 24 * 3600 * 1000, // 14d
  30 * 24 * 3600 * 1000, // 30d
]
const timeGap = [
  15 * 60 * 1000, // 15min
  2 * 3600 * 1000, // 2h
  24 * 3600 * 1000, // 1d
  24 * 3600 * 1000, // 1d
  2 * 24 * 3600 * 1000, // 2d
]
// 时间索引与表现文字的映射
export const timeOption = [
  { key: '过去4小时', value: Time.h4 },
  { key: '过去1天', value: Time.d1 },
  { key: '过去7天', value: Time.d7 },
  { key: '过去14天', value: Time.d14 },
  { key: '过去30天', value: Time.d30 },
]

// 转换时间戳为字符串
export const formatTime = (ms: number) => {
  return new Date(ms).toLocaleString()
}

// 将毫秒转化为直观的字符串
export const formatMS = (ms: number) => {
  if (ms < 1000) {
    return ms + '毫秒'
  }
  ms /= 1000
  if (ms < 60) {
    return ms + '秒'
  }
  ms |= 0
  let r = ms % 60
  ms = (ms / 60) | 0
  if (ms < 60) {
    return ms + '分' + r + '秒'
  }
  r = ms % 60
  ms = (ms / 60) | 0
  return ms + '时' + r + '分'
}

// 获取从当前时间开始，下一个整点时间(根据时间间隔)
export function getEndTime(index: Time) {
  const time = Date.now()
  const gap = timeGap[index]
  const r = time % gap
  return time - r + gap
}

// 获取从当前时间，上下两个个整点时间(根据时间间隔)
export function getBothTime(index: Time) {
  const endTime = getEndTime(index)
  const startTime = endTime - timeRange[index]
  return [startTime, endTime]
}

// 根据时间索引拆分时间范围
export function getTimeRange(index: Time) {
  const range = timeRange[index]
  const gap = timeGap[index]
  const endTime = getEndTime(index)
  const res = []
  let startTime = endTime - range
  while (startTime < endTime) {
    startTime += gap
    const date = new Date(startTime)
    let str: string
    if (index == Time.h4) {
      str = date.getHours() + ':' + addZero(date.getMinutes())
    } else if (index == Time.d1) {
      str = date.getHours() + ':00'
    } else {
      str = date.getMonth() + 1 + '-' + date.getDate()
    }
    res.push(str)
  }
  return res
}

// 为字符串加前置"0""
export function addZero(s: number | string) {
  s = s + ''
  if (s.length < 2) s += '0'
  return s
}

// 格式化范围查询条件
export const formatRangeCondition = (start: string, end: string, maxEnd = '_10000', ratio = 1) => {
  if (start == '' && end == '') return ''
  else if (start == '') {
    return '0_' + parseInt(end) * ratio
  } else if (end == '') {
    return parseInt(start) * ratio + maxEnd
  } else {
    return parseInt(start) * ratio + '_' + parseInt(end) * ratio
  }
}
