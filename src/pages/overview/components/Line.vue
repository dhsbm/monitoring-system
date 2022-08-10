<template>
  <div class="container">
    <div ref="pieChart" style="height: 30rem"></div>
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
import { init } from 'echarts'
import { watch, ref, onMounted } from 'vue'
let pieChart = ref()
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
const range = ['最近4小时', '最近1天', '最近7天', '最近14天', '最近30天']

let myChart: any
onMounted(() => {
  myChart = init(pieChart.value)
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
const options: any = {
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
    data: [],
  },
  series: [
    {
      data: [150, 230, 224, 218, 135, 147, 260],
      type: 'line',
    },
  ],
}
function setSeries() {
  options.series = GetSeries(props.yAxisOption, props.data)
  options.xAxis.data = props.xAxisOption
  options.legend.data = props.yAxisOption
}
function GetSeries(yAxisOption: string[], data: number[][]) {
  return yAxisOption.map((d: string, i: number) => {
    const sery: any = {}
    sery.name = d
    sery.type = 'line'
    // sery.stack = 'Total'
    sery.data = data.map((t: number[]) => t[i])
    return sery
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
