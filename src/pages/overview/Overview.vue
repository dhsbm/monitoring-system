<template>
  <div class="container">
    <div class="mainData">
      <span class="title">健康状况</span>
      <div class="mainData-line">
        <div class="mainData-left-line">
          <process
            :val="93"
            :width="200"
            :strokewidth="20"
            :type="2"
            :text="'健康状况'"
            :color="'#28c989'"
          />
        </div>
        <div class="mainData-right-line">
          <process
            :val="10"
            :width="130"
            :strokewidth="10"
            :type="1"
            :text="`JS错误`"
            :color="`#ff9724`"
            class="item"
          />
          <process
            :val="30"
            :width="130"
            :strokewidth="10"
            :type="1"
            :text="`自定义异常`"
            :color="`#3695ff`"
            class="item"
          />
          <process
            :val="50"
            :width="130"
            :strokewidth="10"
            :type="1"
            :text="`静态资源异常`"
            :color="`#7a79ff`"
            class="item"
          />
          <process
            :val="60"
            :width="130"
            :strokewidth="10"
            :type="1"
            :text="`接口异常`"
            :color="`#ff6470`"
            class="item"
          />
        </div>
      </div>
    </div>
    <div class="heathyData">
      <span class="title">核心数据</span>
      <div class="heathyData-line">
        <div class="line_1">
          <LineVue
            :title-option="`异常数据表`"
            :x-axis-option="xAxis_err"
            :y-axis-option="yAxis_err"
            :data="err_data"
          ></LineVue>
          <LineVue
            :title-option="`网页性能表`"
            :x-axis-option="xAxis_per"
            :y-axis-option="yAxis_per"
            :data="per_data"
          ></LineVue>
        </div>
        <div class="line_2">
          <LineVue
            :title-option="`请求数图表`"
            :x-axis-option="xAxis_err"
            :y-axis-option="yAxis_http1"
            :data="http1_data"
          ></LineVue>
          <LineVue
            :title-option="`请求时间表`"
            :x-axis-option="xAxis_err"
            :y-axis-option="yAxis_http2"
            :data="http2_data"
          ></LineVue>
        </div>
      </div>
    </div>
    <div class="mapData">
      <span class="title">用户地域分布图</span>
      <div class="mapData-line">
        <mapVue />
      </div>
    </div>
    <div class="userData">
      <span class="title">用户相关</span>
      <div class="userData-line">
        <pieVue :title-option="`用户浏览器类型`" :item="browser_item" :data="browser_data"></pieVue>
        <LineVue
          :title-option="`用户停留时间`"
          :x-axis-option="xAxis_err"
          :y-axis-option="yAxis_user2"
          :data="user2_data"
        ></LineVue>
        <LineVue
          :title-option="`用户访问量`"
          :x-axis-option="xAxis_err"
          :y-axis-option="yAxis_user1"
          :data="user1_data"
        ></LineVue>
      </div>
    </div>
  </div>
</template>

<script setup>
import mapVue from '@/components/mapVue/index.vue'
import process from '@/components/progress/index.vue'
import LineVue from '@/components/echarts/line.vue'
import pieVue from '@/components//echarts/pie.vue'
import { reqAll } from '@/api/index'
//请求数据
import { ref } from 'vue'
let xAxis_err = ['4h', '1d', '7d', '14d', '30d']
let yAxis_err = ['JS错误', '自定义异常', '静态资源异常', '接口异常']
let xAxis_per = xAxis_err
let yAxis_per = ['性能1', '性能2', '性能3', '性能4', '性能5', '性能6']
let yAxis_user1 = ['pv', 'pu']
let yAxis_user2 = ['用户停留时间']
let yAxis_http1 = ['成功请求数', '失败请求数']
let yAxis_http2 = ['响应时间']
let browser_item = ['性能1', '性能2', '性能3', '性能4', '性能5', '性能6']

let err_data = ref([])
let per_data = ref([])
let user1_data = ref([])
let user2_data = ref([])
let http1_data = ref([])
let http2_data = ref([])
let browser_data = ref([])
let area_data = ref([])

reqAll(1).then((data) => {
  let { err, browser, area, http1, http2, pre, user1, user2 } = data.data
  err_data.value = err
  per_data.value = pre
  user1_data.value = user1
  user2_data.value = user2
  http1_data.value = http1
  http2_data.value = http2
  browser_data.value = browser
  area_data.value = area
  console.log(area)
})
</script>

<style lang="scss" scoped>
.title {
  font-size: 1.5rem;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 600;
  color: #434343;
}
.container {
  overflow: hidden;
  width: 95vw;
  margin: 0 auto;
  .mainData {
    margin-top: 10px;
    width: 100%;
    height: 25rem;
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
    width: 100%;
    height: 20rem;
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
  .mapData {
    margin-top: 50rem;
    width: 100%;
    height: 50rem;
    .mapData-line {
      margin-top: 1rem;
      width: 100%;
      height: 45rem;
      background-color: white;
      border-radius: 1rem;
    }
  }
  .userData {
    margin-top: 1rem;
    width: 100%;
    height: 70rem;
    .userData-line {
      display: flex;
      margin-top: 1rem;
      width: 100%;
      height: 35rem;
      background-color: white;
      border-radius: 1rem;
    }
  }
}
</style>
