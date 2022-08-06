<script setup lang="ts">
import { WebInfo } from '@/interface'
import { ref, computed } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { reqDeleteWeb } from '@/api/web.js'

const props = defineProps<{
  webInfo: WebInfo
}>()

const score = ref(59)
const status = computed(() => {
  if (score.value >= 90) {
    return 'success'
  } else if (score.value >= 60) {
    return 'warning'
  } else {
    return 'exception'
  }
})

const editWeb = () => {
  alert('todo')
}

const deleteWeb = () => {
  ElMessageBox.prompt(`此操作将删除该网站的监控信息，请输入“${props.webInfo.title}”确认删除`, '警告', {
    customClass: 'rounded-xl hover: text-slate-400',
    confirmButtonClass: 'bg-red-300 border-0 hover:bg-red-400',
    confirmButtonText: '删除',
    cancelButtonClass: 'hover:bg-slate-300 hover:text-gray-100 border-0 ',
    cancelButtonText: '取消',
  })
    .then(({ value }) => {
      if (value == props.webInfo.title) {
        reqDeleteWeb({ webId: props.webInfo.webId }).then(() => {
          ElMessage({
            type: 'success',
            message: `“${value}”已被成功删除`,
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
      <Setting class="w-4 text-slate-400 p-1 hover:text-slate-800 cursor-pointer" @click="editWeb" />
      <Delete class="w-4 text-slate-400 p-1 hover:text-red-700 cursor-pointer" @click="deleteWeb" />
    </div>
    <!-- <div class="flex flex-row">
      <p>活跃用户</p>
      <p>用户总数</p>
      <p>老用户</p>
      <p>新用户</p>
    </div> -->
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
            <label>83.6%</label>
          </span>
          <span>
            <label class="text-slate-400 text-sm">自定义异常率：</label>
            <label>94%</label>
          </span>
          <span>
            <label class="text-slate-400 text-sm">接口报错率：</label>
            <label>80%</label>
          </span>
          <span>
            <label class="text-slate-400 text-sm">静态资源报错率：</label>
            <label>98%</label>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
