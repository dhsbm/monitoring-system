<script setup lang="ts">
import ModalWrapper from './ModalWrapper.vue'
import { modalData, switchShow } from './modal'
</script>

<template>
  <ModalWrapper v-model="modalData.isShow">
    <div class="bg-white rounded-xl p-5 flex flex-col w-96">
      <h1 class="text-xl">{{ modalData.isAdd ? '添加网站' : '修改网站' }}</h1>

      <input
        v-model="modalData.title"
        type="text"
        placeholder="输入网站名"
        class="mt-4 p-2 border border-solid border-slate-600 rounded-lg"
      />
      <input
        v-model="modalData.url"
        type="text"
        placeholder="输入网站url"
        class="mt-4 p-2 border border-solid border-slate-600 rounded-lg"
      />
      <div class="flex flex-row justify-end mt-7">
        <button
          class="btn bg-slate-400 text-slate-700 hover:bg-slate-500 m-1"
          @click="switchShow(false)"
        >
          取消
        </button>
        <button class="btn bg-slate-700 text-white hover:bg-slate-800 m-1" @click="modalData.fun">
          确定
        </button>
      </div>
    </div>
  </ModalWrapper>
</template>

<style lang="css" scoped></style>
