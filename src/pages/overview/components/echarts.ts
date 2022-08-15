import * as echarts from 'echarts/core'
// 引入柱状图图表，图表后缀都为 Chart
import { PieChart, LineChart, MapChart } from 'echarts/charts'
// 引入提示框，标题，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  GeoComponent,
  VisualMapComponent,
} from 'echarts/components'
// 引入 Canvas 渲染器
import { CanvasRenderer } from 'echarts/renderers'

// 注册必须的组件
echarts.use([
  PieChart,
  LineChart,
  MapChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  GeoComponent,
  VisualMapComponent,
  // LabelLayout,
  // UniversalTransition,
  CanvasRenderer,
])

export default echarts
