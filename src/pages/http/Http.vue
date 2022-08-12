<template>
  <div class="container">
    <h1>网络请求日志</h1>
    <div class="filter">
      <el-select
        v-model="timeIndex"
        class="m-2"
        placeholder="Select"
        style="width: 120px; margin-right: 60px"
        @change="searchData()"
      >
        <el-option
          v-for="item in timeOption"
          :key="item.value"
          :label="item.key"
          :value="item.value"
        />
      </el-select>
      <el-input
        v-model="condition.url"
        style="width: 200px; margin-right: 60px"
        placeholder="页面路径查询"
        @change="searchData()"
      />
      <el-input
        v-model="condition.sendUrl"
        style="width: 200px; margin-right: 80px"
        placeholder="请求路径查询"
        @change="searchData()"
      />
      <div class="time">
        <el-input
          v-model="startResTime"
          type="number"
          style="width: 60px"
          placeholder="起始"
          @change="searchData()"
        />
        <span>-</span>
        <el-input
          v-model="endResTime"
          type="number"
          style="width: 60px"
          placeholder="结束"
          @change="searchData()"
        />
        <span>毫秒</span>
      </div>

      <el-select
        v-model="condition.success"
        class="m-2"
        placeholder="Select"
        style="width: 80px"
        @change="searchData()"
      >
        <el-option
          v-for="item in successOption"
          :key="item.key"
          :value="item.value"
          :label="item.key"
        />
      </el-select>
    </div>
    <div class="list">
      <el-table :data="showData.logs" size="large">
        <el-table-column prop="time" label="请求时间" width="180" />
        <el-table-column prop="url" label="页面路径" width="260" :show-overflow-tooltip="true" />
        <el-table-column
          prop="sendUrl"
          label="请求路径"
          width="320"
          :show-overflow-tooltip="true"
        />
        <el-table-column prop="resTime" label="响应时间" width="100" />
        <el-table-column prop="status" label="状态码" width="90" />
        <el-table-column prop="success" label="成功" width="80" />
        <el-table-column prop="way" label="请求方法" width="90" />
        <el-table-column prop="resBody" label="返回信息" :show-overflow-tooltip="true" />
      </el-table>
    </div>
    <!-- 数据显示 -->
    <div class="pagination">
      <el-pagination
        v-model:currentPage="showData.page"
        :page-size="10"
        layout="prev, pager, next, jumper"
        :total="showData.total"
        @current-change="searchData"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reqHttp } from '@/api/index'
import { ref, watch, reactive, computed } from 'vue'
import { getBothTime, timeOption, formatTime, formatMS, formatRangeCondition } from '@/common'
import { useWebStore } from '@/store'
import { ElMessage } from 'element-plus'

// 展示的数据
const showData = reactive({
  logs: [] as any[],
  total: 0,
  page: 1,
  size: 10,
})
// 时间索引 用于区分时间跨度
const timeIndex = ref(2)
// 响应时间查询条件
const startResTime = ref('')
const endResTime = ref('')

// 查询条件
let condition = reactive({
  time: computed(() => getBothTime(timeIndex.value).join('_')),
  url: '',
  resTime: computed(() => formatRangeCondition(startResTime.value, endResTime.value)),
  sendUrl: '',
  success: '',
})
// 成功/失败条件选项
let successOption = [
  { key: '全部', value: '' },
  { key: '成功', value: '0' },
  { key: '失败', value: '1' },
]

// 请求数据
const searchData = (page = 1) => {
  reqHttp({
    webId: webStore.webId,
    page,
    condition,
  }).then(({ code, data }) => {
    if (code == 0) {
      showData.logs = data.logs.map((val) => {
        return {
          ...val,
          time: formatTime(val.time), // 转化时间戳为字符串
          resTime: formatMS(val.resTime), // 转化毫秒为字符串
          success: val.success === 0 ? '成功' : '失败',
        }
      })
      showData.total = data.total
      showData.page = page
    } else {
      ElMessage({
        message: '网络异常',
        type: 'warning',
      })
    }
  })
}
// 网站id改变时，重新请求数据
const webStore = useWebStore()
watch(
  () => webStore.webId,
  () => searchData()
)
searchData()
</script>

<style lang="scss" scoped>
.container {
  box-sizing: border-box;
  height: 100%;
  display: flex;
  margin: 0 auto;
  flex-direction: column;
  padding-bottom: 10px;
  h1 {
    font-size: 22px;
    padding: 10px 0;
    text-align: center;
    background: #eee;
  }
  .filter {
    height: 45px;
    .time {
      display: inline-block;
      margin-right: 50px;
      span {
        line-height: 45px;
      }
    }
  }
  .list {
    flex: 1;
  }
  .pagination {
    display: flex;
    justify-content: center;
  }
}
</style>
