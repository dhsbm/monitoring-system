<template>
  <div class="p-5">
    <button class="bg-slate-300 text-slate-700 hover:bg-slate-400 btn" @click="switchShow()">
      添加网站
    </button>
    <WebList class="mt-5" />
    <ModalWeb />
  </div>
</template>

<script setup lang="ts">
import WebList from './components/WebList.vue'
import ModalWeb from './components/ModalWeb.vue'
import { switchShow } from './components/modal'
</script>

<style lang="scss" scoped>
.p-5 {
  box-sizing: border-box;
}
</style>
