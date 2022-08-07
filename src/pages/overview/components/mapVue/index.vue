<template>
  <div id="main" ref="dom"></div>
</template>

<script setup lang="ts">
import chinaJSON from '@/assets/json/china.json'
import { onMounted, ref, watch } from 'vue'
import * as echarts from 'echarts'

const props = defineProps<{
  area: number[]
}>()
const dom = ref()
const mapName = 'china'
let myChart: any
onMounted(() => {
  myChart = echarts.init(dom.value)
  // myChart.showLoading()
  echarts.registerMap(mapName, chinaJSON as any)
  // myChart.hideLoading()
})
watch(
  () => props.area,
  (now) => {
    option.series[0].data = getdata(now) as any
    myChart.setOption(option)
  }
)

const option = {
  title: {
    text: '用户地域分布图',
    left: 'center',
    top: '10%',
  },
  tooltip: {
    trigger: 'item',
    formatter: function (params: any) {
      const toolTiphtml = params.name + '访问人数: ' + params.value + '万人'
      //console.log(toolTiphtml)
      return toolTiphtml
    },
  },
  geo: {
    map: mapName,
    label: {
      emphasis: {
        show: false,
      },
    },
    zoom: '1.3',
    top: '140',
    itemStyle: {
      areaColor: 'rgba(233, 236, 240)',
      borderColor: '#666666',
      emphasis: {
        areaColor: '#3f6ed1',
      },
    },
  },
  visualMap: {
    show: true,
    left: 'left',
    top: 'bottom',
    seriesIndex: [0],
    type: 'piecewise',
    pieces: [
      { min: 80, color: 'rgb(254,57,101)' },
      { min: 40, max: 79, color: 'rgb(252,157,154)' },
      { min: 20, max: 39, color: 'rgb(249,205,173)' },
      { min: 6, max: 19, color: 'rgb(200,200,169)' },
      { min: 0, max: 5, color: 'rgb(131,175,155)' },
    ],
    textStyle: {
      color: '#000000',
    },
  },
  series: [
    {
      type: 'map',
      map: mapName,
      geoIndex: 0,
      animation: false,
      data: [],
      coordinateSystem: 'geo',
    },
  ],
}
const getdata = (arrs: number[]) => {
  return arrs.map((v: number, i: number) => {
    return {
      name: map[i],
      value: v,
    }
  })
}
const map = [
  '未知',
  '吉林',
  '台湾',
  '福建',
  '甘肃',
  '安徽',
  '北京',
  '江苏',
  '上海',
  '重庆',
  '河北',
  '河南',
  '湖南',
  '湖北',
  '浙江',
  '江西',
  '陕西',
  '山东',
  '山西',
  '黑龙江',
  '青海',
  '辽宁',
  '云南',
  '海南',
  '四川',
  '广东',
  '广西',
  '宁夏',
  '西藏',
  '新疆',
  '内蒙古',
  '香港',
  '澳门',
  '天津',
  '贵州',
]
</script>

<style scoped>
#main {
  width: 900px;
}
</style>
