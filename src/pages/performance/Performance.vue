<template>
  <div class="container">
    <h1>网站性能日志</h1>
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
        style="width: 200px; margin-right: 40px"
        placeholder="路径查询"
        @change="searchData()"
      />

      <div class="range">
        <el-input
          v-model="range.dclStart"
          style="width: 60px"
          placeholder="起始"
          @change="searchData()"
        />
        <span>-</span>
        <el-input
          v-model="range.dclEnd"
          type="number"
          style="width: 60px"
          placeholder="结束"
          @change="searchData()"
        />
      </div>
      <div class="range">
        <el-input
          v-model="range.fpStart"
          style="width: 60px"
          placeholder="起始"
          @change="searchData()"
        />
        <span>-</span>
        <el-input
          v-model="range.fpEnd"
          type="number"
          style="width: 60px"
          placeholder="结束"
          @change="searchData()"
        />
      </div>
      <div class="range">
        <el-input
          v-model="range.fcpStart"
          style="width: 60px"
          placeholder="起始"
          @change="searchData()"
        />
        <span>-</span>
        <el-input
          v-model="range.fcpEnd"
          type="number"
          style="width: 60px"
          placeholder="结束"
          @change="searchData()"
        />
      </div>
      <div class="range">
        <el-input
          v-model="range.lcpStart"
          style="width: 60px"
          placeholder="起始"
          @change="searchData()"
        />
        <span>-</span>
        <el-input
          v-model="range.lcpEnd"
          type="number"
          style="width: 60px"
          placeholder="结束"
          @change="searchData()"
        />
      </div>
      <div class="range">
        <el-input
          v-model="range.dclStart"
          style="width: 60px"
          placeholder="起始"
          @change="searchData()"
        />
        <span>-</span>
        <el-input
          v-model="range.dclEnd"
          type="number"
          style="width: 60px"
          placeholder="结束"
          @change="searchData()"
        />
      </div>
      <div class="range">
        <el-input
          v-model="range.lStart"
          style="width: 60px"
          placeholder="起始"
          @change="searchData()"
        />
        <span>-</span>
        <el-input
          v-model="range.lEnd"
          type="number"
          style="width: 60px"
          placeholder="结束"
          @change="searchData()"
        />
      </div>
      <!-- <div class="set" @click="showSelectFrom"></div> -->
    </div>
    <div class="list">
      <el-table :data="showData.logs" size="large">
        <el-table-column prop="time" label="时间" width="180" />
        <el-table-column prop="url" label="路径" width="260" />
        <el-table-column prop="dns" label="DNS" />
        <el-table-column prop="fp" label="FP" />
        <el-table-column prop="fcp" label="FCP" />
        <el-table-column prop="lcp" label="LCP" />
        <el-table-column prop="l" label="Dom Ready" />
        <el-table-column prop="l" label="Load" />
      </el-table>
    </div>
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
import { reqPer } from '@/api/index'
import { ref, watch, reactive, computed } from 'vue'
import { useWebStore } from '@/store'
import { getBothTime, timeOption, formatTime, formatMS, formatRangeCondition } from '@/common'
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
// 性能参数的查询条件
const range = reactive({
  dnsStart: '',
  dnsEnd: '',
  fpStart: '',
  fpEnd: '',
  fcpStart: '',
  fcpEnd: '',
  lcpStart: '',
  lcpEnd: '',
  dclStart: '',
  dclEnd: '',
  lStart: '',
  lEnd: '',
})

// 查询条件
let condition = reactive({
  time: computed(() => getBothTime(timeIndex.value).join('_')),
  url: '',
  dns: computed(() => formatRangeCondition(range.dnsStart, range.dnsEnd)),
  fp: computed(() => formatRangeCondition(range.fpStart, range.fpEnd)),
  fcp: computed(() => formatRangeCondition(range.fcpStart, range.fcpEnd)),
  lcp: computed(() => formatRangeCondition(range.lcpStart, range.lcpEnd)),
  dcl: computed(() => formatRangeCondition(range.dclStart, range.dclEnd)),
  l: computed(() => formatRangeCondition(range.lStart, range.lEnd)),
})

// 请求数据
const searchData = (page = 1) => {
  reqPer({
    webId: webStore.webId,
    page,
    condition,
  }).then(({ code, data }) => {
    if (code == 0) {
      // 请求成功
      showData.logs = data.logs.map((val) => {
        return {
          ...val,
          time: formatTime(val.time), // 转换时间戳为时间字符串
          dns: formatMS(val.dns), // 转化毫秒为字符串
          fp: formatMS(val.fp),
          fcp: formatMS(val.fcp),
          lcp: formatMS(val.lcp),
          dcl: formatMS(val.dcl),
          l: formatMS(val.l),
        }
      })
      showData.total = data.total
      showData.page = page
    } else {
      // 请求失败
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
    display: flex;
    align-items: center;
    .range {
      flex: 1;
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
