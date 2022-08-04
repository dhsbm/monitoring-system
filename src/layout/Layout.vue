<template>
  <div class="common-layout">
    <el-container>
      <el-header><Headers></Headers></el-header>
      <el-main><router-view></router-view></el-main>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import Headers from './headers/Headers.vue'
</script>

<style lang="scss" scoped>
.el-header,
.el-main {
  padding: 0;
}
.el-header {
  z-index: 999;
  height: 50px;
  box-shadow: 0px 7px 7px -10px #5e5e5e;
}
.el-main {
  background: $bg_color;
}
</style>
