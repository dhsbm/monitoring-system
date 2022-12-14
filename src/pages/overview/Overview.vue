<template>
  <div class="container">
    <div class="title">健康状况</div>
    <div class="heathyData">
      <div class="heathyData-left">
        <Progress
          :val="score"
          :width="200"
          :strokewidth="20"
          :type="2"
          :text="'健康状况'"
          :color="color.total"
        />
      </div>
      <div class="heathyData-right">
        <Progress
          :val="nums.jsErr"
          :width="130"
          :strokewidth="10"
          :type="1"
          :text="`脚本异常`"
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
    <div class="title">网站运行数据</div>
    <div class="mainData">
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
          :title-option="`响应时间表`"
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
    <div class="title">用户行为数据</div>
    <div class="userData">
      <div class="line">
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
      <div class="map">
        <Map :area="showData.area" />
        <Pie :item="browser_item" :data="showData.browser"></Pie>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Progress from './components/Progress.vue'
import { reqAll, reqStat } from '@/api/index'
import { reactive, watch, defineAsyncComponent } from 'vue'
import { useWebStore } from '@/store'
import { ElMessage } from 'element-plus'
import { getEndTime, getTimeRange } from '@/common'

// 改为异步组件
const Line = defineAsyncComponent(() => import('./components/Line.vue'))
const Pie = defineAsyncComponent(() => import('./components/Pie.vue'))
const Map = defineAsyncComponent(() => import('./components/Map.vue'))

// 健康状况假数据
const nums = {
  jsErr: (Math.random() * 100) | 0,
  srcErr: (Math.random() * 100) | 0,
  httpErr: (Math.random() * 50) | 0,
  whiteErr: (Math.random() * 10) | 0,
}
const score = (100 - (nums.jsErr + nums.srcErr + nums.httpErr + nums.whiteErr) / 4) | 0
// 根据评分返回颜色，总分和异常分的颜色判定条件不同
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
// 颜色映射
const color = {
  total: getColor(score, true),
  jsErr: getColor(nums.jsErr),
  srcErr: getColor(nums.srcErr),
  httpErr: getColor(nums.httpErr),
  whiteErr: getColor(nums.whiteErr),
}

// 横坐标 时间维度
const xAxis = getTimeRange(2)
// 类型维度
let yAxis_err = ['脚本错误', '静态资源异常', '接口异常', '白屏异常']
let yAxis_per = ['dns', 'fp', 'fcp', 'lcp', 'dcl', 'l']
let yAxis_user1 = ['pv', 'uv']
let yAxis_user2 = ['用户停留时间']
let yAxis_http1 = ['成功请求数', '失败请求数']
let yAxis_http2 = ['响应时间']
let browser_item = ['其他', 'Chrome', 'Edge', 'Firefox', 'IE', 'Opera', 'Safari']

// 响应式对象 各图表的数据、时间维度、时间索引
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

// 改变时间索引(时间跨度) 根据kind和index区分是哪个图表
// 请求某一图表的响应式数据
const changeX = (kind: number, index: number, timeIndex: number) => {
  reqStat({
    webId: webStore.webId,
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

// 一次性请求所有图表数据
const getAllData = () => {
  reqAll({
    webId: webStore.webId,
    endTime: getEndTime(2),
  }).then(({ data }) => {
    Object.assign(showData, data)
  })
}

// 网站id改变，重新请求数据
const webStore = useWebStore()
watch(
  () => webStore.webId,
  () => {
    showData.erri =
      showData.peri =
      showData.user1i =
      showData.user2i =
      showData.http1i =
      showData.http2i =
        2
    showData.errX =
      showData.perX =
      showData.user1X =
      showData.user2X =
      showData.http1X =
      showData.http2X =
        xAxis
    getAllData()
  }
)
getAllData()
</script>

<style lang="scss" scoped>
.container {
  box-sizing: border-box;
  overflow: hidden;
  padding: 0 2.5%;
  .title {
    font-size: 1.5rem;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 600;
    color: #434343;
    margin: 1rem 0;
  }
  .heathyData {
    display: flex;
    height: 20rem;
    background-color: white;
    border-radius: 1rem;
    .heathyData-left {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-around;
      border-right: 2px solid $bg_color;
    }
    .heathyData-right {
      flex: 3;
      display: flex;
      justify-content: space-around;
      align-items: center;
    }
  }
  .mainData {
    background-color: white;
    border-radius: 1rem;
    padding: 2rem 1rem;
    min-height: 1196px;
    .line_1 {
      display: flex;
      margin-bottom: 2rem;
    }
    .line_2 {
      display: flex;
    }
  }

  .userData {
    background-color: white;
    border-radius: 1rem;
    padding: 2rem 1rem;
    min-height: 1200px;
    .line {
      display: flex;
      justify-content: center;
    }
    .map {
      display: flex;
      height: 700px;
    }
  }
}
</style>
