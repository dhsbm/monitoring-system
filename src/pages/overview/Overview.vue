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
      <div class="heathyData-line">
        <div class="line_1">
          <LineVue
            :title-option="`异常数据表`"
            :x-axis-option="xAxis_err"
            :y-axis-option="yAxis_err"
            :data="errData"
          ></LineVue>
          <LineVue
            :title-option="`网页性能表`"
            :x-axis-option="xAxis_per"
            :y-axis-option="yAxis_per"
            :data="perData"
          ></LineVue>
        </div>
        <div class="line_2">
          <LineVue
            :title-option="`请求数图表`"
            :x-axis-option="xAxis_err"
            :y-axis-option="yAxis_http1"
            :data="http1Data"
          ></LineVue>
          <LineVue
            :title-option="`请求时间表`"
            :x-axis-option="xAxis_err"
            :y-axis-option="yAxis_http2"
            :data="http2Data"
          ></LineVue>
        </div>
      </div>
    </div>
    <span class="title">用户行为数据</span>
    <div class="userData">
      <div class="userData-line">
        <LineVue
          :title-option="`用户停留时间`"
          :x-axis-option="xAxis_err"
          :y-axis-option="yAxis_user2"
          :data="user2Data"
        ></LineVue>
        <LineVue
          :title-option="`用户访问量`"
          :x-axis-option="xAxis_err"
          :y-axis-option="yAxis_user1"
          :data="user1Data"
        ></LineVue>
      </div>
    </div>
    <div class="mapData">
      <mapVue />
      <pieVue :title-option="`用户浏览器类型`" :item="browser_item" :data="browserData"></pieVue>
    </div>
  </div>
</template>

<script setup lang="ts">
import mapVue from './components/mapVue/index.vue'
import process from './components/progress/index.vue'
import LineVue from './components/echarts/line.vue'
import pieVue from './components//echarts/pie.vue'
import { reqAll } from '@/api/index'
//请求数据
import { ref } from 'vue'

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
    if (score > 80) return '#ff6470'
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

let xAxis_err = ['4h', '1d', '7d', '14d', '30d']
let yAxis_err = ['JS错误', '自定义异常', '静态资源异常', '接口异常']
let xAxis_per = xAxis_err
let yAxis_per = ['性能1', '性能2', '性能3', '性能4', '性能5', '性能6']
let yAxis_user1 = ['pv', 'pu']
let yAxis_user2 = ['用户停留时间']
let yAxis_http1 = ['成功请求数', '失败请求数']
let yAxis_http2 = ['响应时间']
let browser_item = ['性能1', '性能2', '性能3', '性能4', '性能5', '性能6']

let errData: any = ref([])
let perData: any = ref([])
let user1Data: any = ref([])
let user2Data: any = ref([])
let http1Data: any = ref([])
let http2Data: any = ref([])
let browserData: any = ref([])
let areaData: any = ref([])

reqAll({
  webId: 1,
}).then((data) => {
  let { err, browser, area, http1, http2, per, user1, user2 } = data.data
  errData.value = err
  perData.value = per
  user1Data.value = user1
  user2Data.value = user2
  http1Data.value = http1
  http2Data.value = http2
  browserData.value = browser
  areaData.value = area
  // console.log(area)
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
    .heathyData-line {
      display: flex;
      flex-wrap: wrap;
      margin-top: 1rem;
      width: 100%;
      height: 60rem;
      background-color: white;
      border-radius: 1rem;
      .line_1 {
        display: flex;
        flex: 1;
        justify-content: center;
      }
      .line_2 {
        display: flex;
        flex: 1;
        justify-content: center;
      }
    }
  }

  .userData {
    .userData-line {
      display: flex;
      margin-top: 1rem;
      width: 100%;
      height: 35rem;
      background-color: white;
      border-radius: 1rem;
    }
  }
  .mapData {
    background-color: white;
    display: flex;
    justify-content: space-between;
  }
}
</style>
