<template>
  <div class="container">
    <span class="title">健康状况</span>
    <div class="mainData">
      <div class="mainData-line">
        <div class="mainData-left-line">
          <process
            :val="score"
            :width="200"
            :strokewidth="20"
            :type="2"
            :text="'健康状况'"
            :color="color.total"
          />
        </div>
        <div class="mainData-right-line">
          <process
            :val="nums.jsErr"
            :width="130"
            :strokewidth="10"
            :type="1"
            :text="`JS错误`"
            :color="color.jsErr"
            class="item"
          />
          <process
            :val="nums.srcErr"
            :width="130"
            :strokewidth="10"
            :type="1"
            :text="`静态资源异常`"
            :color="color.srcErr"
            class="item"
          />
          <process
            :val="nums.httpErr"
            :width="130"
            :strokewidth="10"
            :type="1"
            :text="`网络请求异常`"
            :color="color.httpErr"
            class="item"
          />
          <process
            :val="nums.whiteErr"
            :width="130"
            :strokewidth="10"
            :type="1"
            :text="`白屏异常`"
            :color="color.whiteErr"
            class="item"
          />
        </div>
      </div>
    </div>
    <span class="title">核心数据</span>
    <div class="heathyData">
      <div class="line_1">
        <LineVue
          :title-option="`异常数据表`"
          :x-axis-option="showData.errX"
          :y-axis-option="yAxis_err"
          :data="showData.err"
          :kind="0"
          :index="0"
          :time-index="2"
          @change-x="changeX"
        ></LineVue>
        <LineVue
          :title-option="`网页性能表`"
          :x-axis-option="showData.perX"
          :y-axis-option="yAxis_per"
          :data="showData.per"
          :kind="1"
          :index="0"
          :time-index="2"
          @change-x="changeX"
        ></LineVue>
      </div>
      <div class="line_2">
        <LineVue
          :title-option="`请求数图表`"
          :x-axis-option="showData.http1X"
          :y-axis-option="yAxis_http1"
          :data="showData.http1"
          :kind="3"
          :index="0"
          :time-index="2"
          @change-x="changeX"
        ></LineVue>
        <LineVue
          :title-option="`请求时间表`"
          :x-axis-option="showData.http2X"
          :y-axis-option="yAxis_http2"
          :data="showData.http2"
          :kind="3"
          :index="1"
          :time-index="2"
          @change-x="changeX"
        ></LineVue>
      </div>
    </div>
    <span class="title">用户行为数据</span>
    <div class="userData">
      <LineVue
        :title-option="`用户访问量`"
        :x-axis-option="showData.user1X"
        :y-axis-option="yAxis_user1"
        :data="showData.user1"
        :kind="2"
        :index="0"
        :time-index="2"
        @change-x="changeX"
      ></LineVue>
      <LineVue
        :title-option="`用户停留时间`"
        :x-axis-option="showData.user2X"
        :y-axis-option="yAxis_user2"
        :data="showData.user2"
        :kind="2"
        :index="1"
        :time-index="2"
        @change-x="changeX"
      ></LineVue>
    </div>
    <div class="mapData">
      <mapVue />
      <pieVue
        :title-option="`用户浏览器类型`"
        :item="browser_item"
        :data="showData.browser"
      ></pieVue>
    </div>
  </div>
</template>

<script setup lang="ts">
import mapVue from './components/mapVue/index.vue'
import process from './components/progress/index.vue'
import LineVue from './components/echarts/line.vue'
import pieVue from './components//echarts/pie.vue'
import { reqAll, reqStat } from '@/api/index'
import { reactive } from 'vue'
import { useWebStore } from '@/store'
import { ElMessage } from 'element-plus'
const webstore = useWebStore()

const nums = {
  jsErr: (Math.random() * 100) | 0,
  srcErr: (Math.random() * 100) | 0,
  httpErr: (Math.random() * 50) | 0,
  whiteErr: (Math.random() * 10) | 0,
}
const score = (100 - (nums.jsErr + nums.srcErr + nums.httpErr + nums.whiteErr) / 4) | 0
const getColor = (score: number, sign = false): string => {
  if (sign) {
    if (score > 85) return '#28c989'
    else if (score > 60) return '#ff9724'
    else return '#ff6470'
  } else {
    if (score > 75) return '#ff6470'
    else if (score > 20) return '#ff9724'
    else return '#28c989'
  }
}
const color = {
  total: getColor(score, true),
  jsErr: getColor(nums.jsErr),
  srcErr: getColor(nums.srcErr),
  httpErr: getColor(nums.httpErr),
  whiteErr: getColor(nums.whiteErr),
}

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
function getEndTime(index: number) {
  const time = Date.now()
  const gap = timeGap[index]
  const r = time % gap
  return time - r + gap
}
function getTimeRange(index: number) {
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
  console.log(res)
  return res
}
function addZero(s: number | string) {
  s = s + ''
  if (s.length < 2) s += '0'
  return s
}

const xAxis = getTimeRange(2)

let yAxis_err = ['JS错误', '自定义异常', '静态资源异常', '接口异常']
let yAxis_per = ['dns', 'fp', 'fcp', 'lcp', 'dcl', 'l']
let yAxis_user1 = ['pv', 'pu']
let yAxis_user2 = ['用户停留时间']
let yAxis_http1 = ['成功请求数', '失败请求数']
let yAxis_http2 = ['响应时间']
let browser_item = ['其他', 'Chrome', 'Edge', 'Firefox', 'IE', 'Opera', 'Safari']

const showData: Data = reactive({
  err: [],
  errX: xAxis,
  per: [],
  perX: xAxis,
  user1: [],
  user1X: xAxis,
  user2: [],
  user2X: xAxis,
  http1: [],
  http1X: xAxis,
  http2: [],
  http2X: xAxis,
  browser: [],
  area: [],
})

interface Data {
  err: number[][]
  errX: string[]
  per: number[][]
  perX: string[]
  user1: number[][]
  user1X: string[]
  user2: number[][]
  user2X: string[]
  http1: number[][]
  http1X: string[]
  http2: number[][]
  http2X: string[]
  browser: number[]
  area: number[]
}

const changeX = (kind: number, index: number, timeIndex: number) => {
  reqStat({
    webId: webstore.webId,
    kind,
    index,
    time: timeIndex,
    endTime: getEndTime(timeIndex),
  }).then(({ code, data }) => {
    if (code == 0) {
      switch (kind) {
        case 0:
          showData.err = data
          showData.errX = getTimeRange(timeIndex)
          break
      }
    } else {
      ElMessage({
        message: '网络异常',
        type: 'warning',
      })
    }
  })
}

reqAll({
  webId: 1,
  endTime: getEndTime(2),
}).then(({ data }) => {
  Object.assign(showData, data)
})
</script>

<style lang="scss" scoped>
.title {
  font-size: 1.5rem;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 600;
  color: #434343;
  margin: 1rem 0;
}
.container {
  & > div {
    margin: 1rem 0;
  }
  overflow: hidden;
  width: 95vw;
  margin: 0 auto;
  padding-top: 1rem;
  .mainData {
    width: 100%;
    .mainData-line {
      display: flex;
      align-items: center;
      margin-top: 1rem;
      width: 100%;
      height: 20rem;
      background-color: white;
      border-radius: 1rem;
      .mainData-left-line {
        margin-left: 3rem;
        width: 20rem;
        border-right: 2px solid $bg_color;
      }
      .mainData-right-line {
        display: flex;
        justify-content: center;
        .item {
          margin-left: 100px;
        }
      }
    }
  }
  .heathyData {
    background-color: white;
    border-radius: 1rem;
    padding: 1rem;
    .line_1 {
      margin-top: 1rem;
      display: flex;
      justify-content: center;
    }
    .line_2 {
      margin-top: 1rem;
      display: flex;
      justify-content: center;
    }
  }

  .userData {
    background-color: white;
    border-radius: 1rem;
    padding: 1rem;
    display: flex;
  }
  .mapData {
    background-color: white;
    display: flex;
    justify-content: space-between;
  }
}
</style>
