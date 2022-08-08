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
export const timeOption = [
  { key: '过去4小时', value: 0 },
  { key: '过去1天', value: 1 },
  { key: '过去7天', value: 2 },
  { key: '过去14天', value: 3 },
  { key: '过去30天', value: 4 },
]
// 时间戳转换
export const formatTime = (ms: number) => {
  return new Date(ms).toLocaleString()
}

// 转换毫秒
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
export function getEndTime(index: number) {
  const time = Date.now()
  const gap = timeGap[index]
  const r = time % gap
  return time - r + gap
}
export function getBothTime(index: number) {
  const endTime = getEndTime(index)
  const startTime = endTime - timeRange[index]
  return [startTime, endTime]
}
export function getTimeRange(index: number) {
  const range = timeRange[index]
  const gap = timeGap[index]
  const endTime = getEndTime(index)
  const res: string[] = []
  let startTime = endTime - range
  while (startTime < endTime) {
    startTime += gap
    const date = new Date(startTime)
    let str: string
    if (index == 0) {
      str = date.getHours() + ':' + addZero(date.getMinutes())
    } else if (index == 1) {
      str = date.getHours() + ':00'
    } else {
      str = date.getMonth() + 1 + '-' + date.getDate()
    }
    res.push(str!)
  }
  return res
}
export function addZero(s: number | string) {
  s = s + ''
  if (s.length < 2) s += '0'
  return s
}
