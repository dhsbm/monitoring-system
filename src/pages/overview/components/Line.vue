<template>
  <div class="container">
    <div ref="dom" style="height: 30rem"></div>
    <div class="select">
      <div
        v-for="(item, i) in range"
        :key="i"
        :style="timeIndex == i ? ` background-color:white;color:blue` : ``"
        @click="timeIndex != i && emits(`changeX`, kind, index, i)"
      >
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import echarts from './echarts'
import { watch, ref, onMounted } from 'vue'
const props = defineProps<{
  titleOption: string
  xAxisOption: string[]
  yAxisOption: string[]
  data: number[][]
  kind: number
  index: number
  timeIndex: number
}>()
const emits = defineEmits(['changeX'])

// 时间范围选择列表
const range = ['最近4小时', '最近1天', '最近7天', '最近14天', '最近30天']

const dom = ref() // 通过ref获取dom对象
let myChart: any
onMounted(() => {
  myChart = echarts.init(dom.value) // 绑定dom元素
  setSeries()
  myChart.setOption(options)
})

// 监听props
watch(
  () => props.data,
  (now) => {
    if (!now.length) return
    setSeries()
    myChart.setOption(options)
  }
)
// echarts折线图配置项
const options = {
  title: {
    text: props.titleOption,
  },
  tooltip: {
    trigger: 'axis',
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true,
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: props.xAxisOption,
  },
  yAxis: {
    type: 'value',
  },
  legend: {
    data: [] as string[],
  },
  series: [
    {
      data: [150, 230, 224, 218, 135, 147, 260],
      type: 'line',
    },
  ],
}
// 设置图表数据
function setSeries() {
  options.series = GetSeries(props.yAxisOption, props.data)
  console.log(options.series)
  options.xAxis.data = props.xAxisOption
  options.legend.data = props.yAxisOption
}
// 格式化图表数据
function GetSeries(yAxisOption: string[], data: number[][]) {
  return yAxisOption.map((d: string, i: number) => {
    const obj = {} as { type: 'line'; name: string; data: number[] }
    obj.name = d
    obj.type = 'line'
    // obj.stack = 'Total'
    obj.data = data.map((t: number[]) => t[i])
    return obj
  })
}
</script>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  .select {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin: 1rem 6rem;
    background-color: #eee;
    outline: 2px solid #eee;
    & > div {
      font-size: 14px;
      box-sizing: border-box;
      width: 20%;
      line-height: 30px;
      text-align: center;
      border-radius: 5px;
      cursor: pointer;
      &:hover {
        background-color: white;
      }
    }
  }
}
</style>
