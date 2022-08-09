<template>
  <div class="container">
    <span class="title">健康状况</span>
    <div class="mainData">
      <div class="mainData-line">
        <div class="mainData-left-line">
          <Progress
            :val="score"
            :width="200"
            :strokewidth="20"
            :type="2"
            :text="'健康状况'"
            :color="color.total"
          />
        </div>
        <div class="mainData-right-line">
          <Progress
            :val="nums.jsErr"
            :width="130"
            :strokewidth="10"
            :type="1"
            :text="`JS错误`"
            :color="color.jsErr"
            class="item"
          />
          <Progress
            :val="nums.srcErr"
            :width="130"
            :strokewidth="10"
            :type="1"
            :text="`静态资源异常`"
            :color="color.srcErr"
            class="item"
          />
          <Progress
            :val="nums.httpErr"
            :width="130"
            :strokewidth="10"
            :type="1"
            :text="`网络请求异常`"
            :color="color.httpErr"
            class="item"
          />
          <Progress
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
        <Line
          :title-option="`异常数据表`"
          :x-axis-option="showData.errX"
          :y-axis-option="yAxis_err"
          :data="showData.err"
          :kind="0"
          :index="0"
          :time-index="showData.erri"
          @change-x="changeX"
        ></Line>
        <Line
          :title-option="`网页性能表`"
          :x-axis-option="showData.perX"
          :y-axis-option="yAxis_per"
          :data="showData.per"
          :kind="1"
          :index="0"
          :time-index="showData.peri"
          @change-x="changeX"
        ></Line>
      </div>
      <div class="line_2">
        <Line
          :title-option="`请求数图表`"
          :x-axis-option="showData.http1X"
          :y-axis-option="yAxis_http1"
          :data="showData.http1"
          :kind="3"
          :index="0"
          :time-index="showData.http1i"
          @change-x="changeX"
        ></Line>
        <Line
          :title-option="`请求时间表`"
          :x-axis-option="showData.http2X"
          :y-axis-option="yAxis_http2"
          :data="showData.http2"
          :kind="3"
          :index="1"
          :time-index="showData.http2i"
          @change-x="changeX"
        ></Line>
      </div>
    </div>
    <span class="title">用户行为数据</span>
    <div class="userData">
      <Line
        :title-option="`用户访问量`"
        :x-axis-option="showData.user1X"
        :y-axis-option="yAxis_user1"
        :data="showData.user1"
        :kind="2"
        :index="0"
        :time-index="showData.user1i"
        @change-x="changeX"
      ></Line>
      <Line
        :title-option="`用户停留时间`"
        :x-axis-option="showData.user2X"
        :y-axis-option="yAxis_user2"
        :data="showData.user2"
        :kind="2"
        :index="1"
        :time-index="showData.user2i"
        @change-x="changeX"
      ></Line>
    </div>
    <div class="mapData">
      <Map :area="showData.area" />
      <Pie :item="browser_item" :data="showData.browser"></Pie>
    </div>
  </div>
</template>

<script setup lang="ts">
import Map from './components/Map.vue'
import Progress from './components/Progress.vue'
import Line from './components/Line.vue'
import Pie from './components/Pie.vue'
import { reqAll, reqStat } from '@/api/index'
import { reactive, watch } from 'vue'
import { useWebStore } from '@/store'
import { ElMessage } from 'element-plus'
import { getEndTime, getTimeRange } from '@/common'

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
  erri: 2,
  per: [],
  perX: xAxis,
  peri: 2,
  user1: [],
  user1X: xAxis,
  user1i: 2,
  user2: [],
  user2X: xAxis,
  user2i: 2,
  http1: [],
  http1X: xAxis,
  http1i: 2,
  http2: [],
  http2X: xAxis,
  http2i: 2,
  browser: [],
  area: [],
})

interface Data {
  err: number[][]
  per: number[][]
  user1: number[][]
  user2: number[][]
  http1: number[][]
  http2: number[][]
  errX: string[]
  perX: string[]
  user1X: string[]
  user2X: string[]
  http1X: string[]
  http2X: string[]
  erri: number
  peri: number
  user1i: number
  user2i: number
  http1i: number
  http2i: number
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
          showData.erri = timeIndex
          break
        case 1:
          showData.per = data
          showData.perX = getTimeRange(timeIndex)
          showData.peri = timeIndex
          break
        case 2:
          if (index == 0) {
            showData.user1 = data
            showData.user1X = getTimeRange(timeIndex)
            showData.user1i = timeIndex
          } else {
            showData.user2 = data
            showData.user2X = getTimeRange(timeIndex)
            showData.user2i = timeIndex
          }
          break
        case 3:
          if (index == 0) {
            showData.http1 = data
            showData.http1X = getTimeRange(timeIndex)
            showData.http1i = timeIndex
          } else {
            showData.http2 = data
            showData.http2X = getTimeRange(timeIndex)
            showData.http2i = timeIndex
          }
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
  webId: webstore.webId,
  endTime: getEndTime(2),
}).then(({ data }) => {
  const area = []
  for (let i = 0; i < 35; i++) {
    area.push((Math.random() * 100) | 0)
  }
  const browser = []
  for (let i = 0; i < 16; i++) {
    browser.push((Math.random() * 100) | 0)
  }

  Object.assign(showData, data, { area, browser })
})
watch(
  () => webstore.webId,
  () => {
    reqAll({
      webId: webstore.webId,
      endTime: getEndTime(2),
    }).then(({ data }) => {
      Object.assign(showData, data)
    })
  }
)
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
    padding: 1rem;
    height: 700px;
  }
}
</style>
