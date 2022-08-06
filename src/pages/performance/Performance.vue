<template>
  <div>
    <Search v-model:url="curReqCondition.url" @myclick="searchData" /><!-- 搜索框 -->
    <div class="block" style="margin: 10px 10px 10px; height: 30px; border: 1px black">
      <el-select v-model="curWebId" class="m-2" placeholder="Select" style="float: left; width: 150px">
        <el-option v-for="item in WebIdOption" :key="item" :value="item" /> </el-select
      ><!-- 网站id选择 -->

      <div class="set" @click="showSelectFrom"></div>
      <!-- 设置按钮 弹出选项列表 -->
      <el-date-picker
        style="float: right"
        v-model="dateSelect"
        value-format="YYYY-MM-DD HH:mm:ss"
        type="datetimerange"
        dateType="time"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      /><!-- 时间选择器 -->
    </div>
    <div class="errorList">
      <el-table :data="perData" style="width: 100%; text-align: left">
        <el-table-column fixed prop="log_id" label="日志编号" width="80" />
        <el-table-column prop="time" label="时间" width="150" />
        <el-table-column prop="url" label="路径" width="360" />
        <el-table-column prop="dns" label="DNS(ms)" width="120" />
        <el-table-column prop="fcp" label="FCP(ms)" width="120" />
        <el-table-column prop="fp" label="FP(ms)" width="120" />
        <el-table-column prop="lcp" label="LCP(ms)" width="120" />
        <el-table-column prop="l" label="Onload(ms)" />
      </el-table>
    </div>
    <!-- 数据 -->
    <div class="demo-pagination-block">
      <el-pagination
        v-model:currentPage="currentPage1"
        v-model:page-size="pageSize"
        :small="small"
        :disabled="disabled"
        :background="background"
        layout="prev, pager, next, jumper"
        style="margin: auto"
        :total="length1"
        @current-change="handleCurrentChange"
      />
    </div>
    <!-- 分页 -->
    <el-dialog title="筛选规则" v-model="showSet" :before-close="setClose" style="text-align: center">
      <select-list v-model:condition="curReqCondition" @myclick="searchData"></select-list>
    </el-dialog
    ><!-- 筛选列表 -->
  </div>
</template>

<script setup lang="ts">
import { Area, PerLogShow } from '@/interface/index'
import { reqPer } from '@/api/index'
import { ref, onMounted, watch } from 'vue'
import Search from './components/Search.vue'
import SelectList from './components/SelectList.vue'
let curErrorKind = ref() //当前错误类型
let small = ref(false)
let background = ref(false)
let disabled = ref(false)
let currentPage1 = ref(1)
let pageSize = ref(10)
let length1 = ref() //展示数据的长度
let dateSelect = ref() //挑选的时间段
let WebIdOption = ref() as any //该用户所有网站ID
let curWebId = ref() //当前网站ID
let perData = ref() //显示的数据
let showSet = ref(false)
let curReqCondition = ref({
  url: '',
  time: '',
  dns:'',
  fp: '',
  fcp: '',
  lcp: '',
  dcl: '',
  l: '',
}) as any //当前选择的查询条件
curWebId.value = 1 //初始化当前网站id
curErrorKind.value = '全部' //默认错误类型
const getWebOption = () => {
  WebIdOption.value = ['1', '2', '3']
} //当前用户的网站列表从pinia拿
const handleCurrentChange = (val: number) => {
  currentPage1.value = val
  reqPerData(val)
} //改变页数
const searchData = () => {
  showSet.value=false
  currentPage1.value = 1
  reqPerData(1)
}
const switchStamp = (nS: any) => {
  return new Date(parseInt(nS)).toLocaleString().replace(/:\d{1,2}$/, ' ')
} //时间搓转换
const setClose = () => {
  showSet.value = false
} //关闭设置弹出框
const showSelectFrom = () => {
  showSet.value = true
} //显示性能指标筛选
const reqPerData = (page: number) => {
  reqPer({
    web_id: curWebId.value,
    page: page,
    condition:curReqCondition.value
  }).then((res) => {
    console.log(res)
    perData.value = res.data.logs
    length1.value = res.data.total
    perData.value.map(function (element: any) {
      let arr: PerLogShow = element
      arr.time = switchStamp(arr.time)
      return element
    })
  })
} //请求数据
reqPerData(1)
getWebOption()
onMounted(() => {
  //console.log(newData);
})
watch(dateSelect, (newVal) => {
  let startTime = new Date(newVal[0]).getTime()
  let endTime = new Date(newVal[1]).getTime()
  let time = startTime + '_' + endTime
  curReqCondition._rawValue.time = time
  currentPage1.value = 1
  reqPerData(currentPage1.value)
})
//监听日期  变化后更新数据为时间戳
watch(curWebId, () => {
  currentPage1.value = 1
  reqPerData(currentPage1.value)
})
//当前网站id监听  变化后更新数据

</script>

<style lang="scss" scoped>

.set {
  display: inline-block;
  width: 30px;
  height: 30px;
  margin-left: 20px;
  background-image: url('@/assets/set.svg');
  background-repeat: no-repeat;
  background-size: cover;
  -webkit-background-size: cover;
  -o-background-size: cover;
  background-position: center 0;
}
</style>
