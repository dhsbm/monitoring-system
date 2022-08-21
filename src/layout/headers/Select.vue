<template>
  <el-select v-model="webStore.webId" class="m-2">
    <el-option
      v-for="item in webStore.webList"
      :key="item.webId"
      :label="item.title"
      :value="item.webId"
    />
  </el-select>
</template>

<script setup lang="ts">
import { useWebStore } from '@/store'
const webStore = useWebStore()
</script>

<style lang="scss" scoped></style>
