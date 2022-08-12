<template>
  <div id="main" ref="dom"></div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { init, registerMap, EChartsType } from 'echarts'
import { Area } from '@/interface'
import { reqMap } from '@/api'

const props = defineProps<{
  area: number[]
}>()

const dom = ref() // 通过ref获取dom对象
const mapName = 'china'
let myChart: EChartsType
let showMap = false // 未注册地图前，不展示
onMounted(async () => {
  myChart = init(dom.value) // 绑定dom元素
  myChart.showLoading()
  const response = await reqMap() // 异步请求中国地图数据
  showMap = true // 地图请求完毕，可展示
  registerMap(mapName, response.data)
  myChart.hideLoading()
  option.series[0].data = formatData(props.area)
  myChart.setOption(option)
})

// 监听props
watch(
  () => props.area,
  (now) => {
    if (!showMap) return
    option.series[0].data = formatData(now) as any
    myChart.setOption(option)
  }
)

// echarts地图配置项
let option = {
  title: {
    text: '用户地域分布图',
    left: 'center',
    top: '10%',
  },
  tooltip: {
    trigger: 'item',
    formatter: function (params: any) {
      const displayStr = params.name + ': ' + params.value + ' 万人'
      return displayStr
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
      data: [] as { name: string; value: number }[],
      coordinateSystem: 'geo',
    },
  ],
}

// 将数字转化为地区中文
const formatData = (arr: number[]) => {
  return arr.map((v: number, i: number) => {
    return {
      name: Area[i],
      value: v,
    }
  })
}
</script>

<style scoped>
#main {
  width: 900px;
}
</style>
