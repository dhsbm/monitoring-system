<template>
  <div class="headers">
    <div class="title">网站监控系统</div>
    <div v-show="route.path != '/home'" class="select">
      <el-select v-model="webStore.webId" class="m-2">
        <el-option
          v-for="item in webStore.webList"
          :key="item.webId"
          :label="item.title"
          :value="item.webId"
        />
      </el-select>
    </div>
    <div class="fill"></div>
    <div class="link"><router-link to="home">首页</router-link></div>
    <div class="link"><router-link to="overview">概览</router-link></div>
    <div class="link"><router-link to="error">异常</router-link></div>
    <div class="link"><router-link to="performance">性能</router-link></div>
    <div class="link"><router-link to="behavior">行为</router-link></div>
    <div class="link"><router-link to="http">请求</router-link></div>
    <div class="user">user</div>
  </div>
</template>

<script setup lang="ts">
import { useWebStore } from '@/store'
import { useRoute } from 'vue-router'
const webStore = useWebStore()
const route = useRoute()
</script>

<style lang="scss" scoped>
.headers {
  display: flex;
  background-color: rgb(255, 255, 255);
  padding: 0 10px;
  .select {
    margin: auto;
  }
  .link {
    height: 50px;
    padding: 0 20px;
    line-height: 50px;
    a {
      text-decoration: none;
      color: #000;
    }
    &:hover {
      background-color: #ddd;
    }
  }
  .title {
    font-size: 24px;
    font-weight: 800;
    height: 50px;
    line-height: 50px;
    padding: 0 20px;
  }
  .user {
    height: 50px;
    line-height: 50px;
    padding: 0 20px;
  }
  .fill {
    flex: 1;
    &:hover {
      background-color: transparent;
    }
  }
}
</style>
