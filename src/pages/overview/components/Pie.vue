<template>
  <div ref="pieChart" style="width: 40rem"></div>
</template>

<script setup lang="ts">
import { init } from 'echarts'
import { defineProps, watch, ref } from 'vue'

let pieChart = ref()
const props = defineProps<{
  item: string[]
  data: number[]
}>()
function getData(data: number[], item: string[]) {
  let ans = []
  for (let i = 0; i < item.length; i++) {
    const t = {} as { value: number; name: string }
    t.value = data[i]
    t.name = item[i]
    ans.push(t)
  }
  return ans
}

let option = {
  title: {
    text: '用户浏览器类型',
    top: '10%',
    left: 'center',
  },
  tooltip: {
    trigger: 'item',
  },
  legend: {
    top: '15%',
    left: 'center',
  },
  series: [
    {
      name: '用户浏览器类型',
      type: 'pie',
      radius: '50%',
      data: [],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
      },
    },
  ],
}

watch(
  () => props.data,
  (now) => {
    if (now.length) {
      let pieData = getData(props.data, props.item)
      let myChart = init(pieChart.value)
      option.series[0].data = pieData as never[]
      myChart.setOption(option)
    }
  }
)
</script>

<style scoped lang="scss"></style>
