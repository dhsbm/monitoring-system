<script setup lang="ts">
import { reqAddWeb } from '@/api'
import ModalWrapper from './ModalWrapper.vue'
import { ElMessage } from 'element-plus'

let isShow = $ref(false)
let title = $ref('')
let url = $ref('')

defineExpose({
  show: () => {
    isShow = true
  },
})

const addWeb = () => {
  reqAddWeb({
    title: title,
    url: url,
  })
    .then(() => {
      //success
      title = ''
      url = ''
      isShow = false
      ElMessage({
        message: '创建成功',
        type: 'success',
      })
    })
    .catch(() => {
      //fail
    })
}
</script>

<template>
  <ModalWrapper v-model="isShow">
    <div class="bg-white rounded-xl p-5 flex flex-col w-96">
      <h1 class="text-xl">创建项目</h1>

      <input
        v-model="title"
        type="text"
        placeholder="输入网站名"
        class="mt-4 p-2 border border-solid border-slate-600 rounded-lg"
      />
      <input
        v-model="url"
        type="text"
        placeholder="输入网站url"
        class="mt-4 p-2 border border-solid border-slate-600 rounded-lg"
      />
      <div class="flex flex-row justify-end mt-7">
        <button class="btn bg-slate-700 text-white hover:bg-slate-800 m-1" @click="addWeb">确定</button>
        <button class="btn bg-slate-400 text-slate-700 hover:bg-slate-500 m-1" @click="isShow = false">取消</button>
      </div>
    </div>
  </ModalWrapper>
</template>

<style lang="css" scoped></style>
