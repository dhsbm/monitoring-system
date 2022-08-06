<script setup lang="ts">
import { WebInfo } from '@/interface'
import { computed } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useWebStore } from '@/store'
import { switchShow } from './modal'

const props = defineProps<{
  webInfo: WebInfo
}>()

const nums = {
  activeUsers: (Math.random() * 8000 + 1000) | 0,
  newUsers: Math.random() * 10,
  oldUsers: Math.random() * 80,
  jsErr: (Math.random() * 100) | 0,
  srcErr: (Math.random() * 100) | 0,
  httpErr: (Math.random() * 50) | 0,
  whiteErr: (Math.random() * 10) | 0,
}

const score = (100 - (nums.jsErr + nums.srcErr + nums.httpErr + nums.whiteErr) / 4) | 0
const status = computed(() => {
  if (score >= 85) {
    return 'success'
  } else if (score >= 60) {
    return 'warning'
  } else {
    return 'exception'
  }
})

const webStore = useWebStore()

const editWeb = () => {
  switchShow(true, props.webInfo.title, props.webInfo.url, false, props.webInfo.webId)
}

const deleteWeb = () => {
  ElMessageBox.prompt(
    `此操作将删除该网站的监控信息，请输入“${props.webInfo.title}”确认删除`,
    '警告',
    {
      customClass: 'rounded-xl hover: text-slate-400',
      confirmButtonClass: 'bg-red-300 border-0 hover:bg-red-400',
      confirmButtonText: '删除',
      cancelButtonClass: 'hover:bg-slate-300 hover:text-gray-100 border-0 ',
      cancelButtonText: '取消',
    }
  )
    .then(({ value }) => {
      if (value == props.webInfo.title) {
        webStore.deleteWeb(props.webInfo.webId).then(() => {
          ElMessage({
            message: '网站已删除',
            type: 'success',
          })
        })
      } else {
        ElMessage({
          type: 'warning',
          message: '删除失败',
        })
      }
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消该操作',
      })
    })
}
</script>

<template>
  <div class="rounded-xl bg-white flex-col flex p-4 hover:drop-shadow-lg">
    <div class="flex flex-row">
      <h1 class="text-xl font-semibold inline-block flex-1">{{ webInfo.title }}</h1>
      <Setting
        class="w-4 text-slate-400 p-1 hover:text-slate-800 cursor-pointer"
        @click="editWeb"
      />
      <Delete class="w-4 text-slate-400 p-1 hover:text-red-700 cursor-pointer" @click="deleteWeb" />
    </div>
    <div class="flex flex-row">
      <div class="uv">
        <div style="color: red; font-size: 25px; padding-top: 5px">{{ nums.activeUsers }}</div>
        <div>活跃用户</div>
      </div>
      <div class="uv">
        <div>{{ (nums.newUsers + nums.oldUsers).toFixed(1) }}万</div>
        <div>用户总数</div>
      </div>
      <div class="uv">
        <div>{{ nums.oldUsers.toFixed(1) }}万</div>
        <div>老用户</div>
      </div>
      <div class="uv">
        <div>{{ nums.newUsers.toFixed(1) }}万</div>
        <div>新用户</div>
      </div>
    </div>
    <span class="mt-5 font-semibold">健康总分</span>
    <div class="flex flex-row mt-4">
      <div class="mr-7">
        <el-progress type="circle" :percentage="score" :status="status" :width="70">
          <template #default="{ percentage }">
            <span class="text-2xl">{{ percentage }}</span>
          </template>
        </el-progress>
      </div>
      <div class="flex-1">
        <div class="grid grid-cols-2 gap-5">
          <span>
            <label class="text-slate-400 text-sm">JS报错率：</label>
            <label>{{ nums.jsErr }}%</label>
          </span>
          <span>
            <label class="text-slate-400 text-sm">静态资源报错率：</label>
            <label>{{ nums.srcErr }}%</label>
          </span>
          <span>
            <label class="text-slate-400 text-sm">接口报错率：</label>
            <label>{{ nums.httpErr }}%</label>
          </span>
          <span>
            <label class="text-slate-400 text-sm">白屏报错率：</label>
            <label>{{ nums.whiteErr }}%</label>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.uv {
  flex: 1;
  margin: 10px 0;
  div:nth-child(1) {
    box-sizing: border-box;
    padding-top: 10px;
    height: 35px;
    font-size: 20px;
    text-align: center;
  }
  div:nth-child(2) {
    font-size: 10px;
    color: gray;
    text-align: center;
  }
}
</style>
