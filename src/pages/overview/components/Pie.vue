<template>
  <div ref="dom" style="width: 40rem"></div>
</template>

<script setup lang="ts">
import { watch, ref, onMounted } from 'vue'
import echarts from './echarts'
const props = defineProps<{
  item: string[]
  data: number[]
}>()

const dom = ref() // 通过ref获取dom对象
let myChart: echarts.ECharts
onMounted(() => {
  myChart = echarts.init(dom.value) // 绑定dom元素
  option.series[0].data = formatData(props.data, props.item)
  myChart.setOption(option)
})

// 监听props
watch(
  () => props.data,
  (now) => {
    if (now.length) {
      option.series[0]!.data = formatData(props.data, props.item)
      myChart.setOption(option)
    }
  }
)

// echarts饼图配置项
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
      data: [] as { value: number; name: string }[],
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

// 格式化传入的数据
function formatData(data: number[], item: string[]) {
  let ans = []
  for (let i = 0; i < item.length; i++) {
    const obj = {} as { value: number; name: string }
    obj.value = data[i]
    obj.name = item[i]
    ans.push(obj)
  }
  return ans
}
</script>

<style scoped lang="scss"></style>
