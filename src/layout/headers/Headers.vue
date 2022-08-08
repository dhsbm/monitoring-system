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
    <div class="user">
      <div class="menu">
        <div class="name">{{ userStore.name }}</div>
        <div class="switch" @click="router.push('/login')">切换用户</div>
      </div>
      <svg
        t="1659962705300"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="2678"
        width="200"
        height="200"
      >
        <path
          d="M511.333 63.333c-247.424 0-448 200.576-448 448s200.576 448 448 448 448-200.576 448-448-200.576-448-448-448z m0 832c-51.868 0-102.15-10.144-149.451-30.15-36.011-15.231-69.123-35.67-98.812-60.897 12.177-31.985 42.226-63.875 84.223-88.903C396.189 686.243 456.222 669.53 512 669.53c55.631 0 115.416 16.658 164.026 45.703 41.762 24.953 71.689 56.812 83.863 88.804-29.764 25.342-62.976 45.865-99.106 61.146-47.299 20.006-97.582 30.15-149.45 30.15z m296.268-139.658c-20.493-35.937-54.353-68.855-98.747-95.381C649.75 624.979 579.839 605.53 512 605.53c-67.964 0-138.094 19.488-197.471 54.875-44.644 26.606-78.656 59.594-99.195 95.586-23.835-28.755-43.234-60.652-57.85-95.208-20.006-47.3-30.15-97.583-30.15-149.451s10.144-102.15 30.15-149.451c19.337-45.719 47.034-86.792 82.321-122.078 35.286-35.287 76.359-62.983 122.078-82.321 47.3-20.006 97.583-30.15 149.451-30.15 51.868 0 102.15 10.144 149.451 30.15 45.719 19.337 86.792 47.034 122.078 82.321 35.287 35.286 62.983 76.359 82.321 122.078 20.006 47.3 30.15 97.583 30.15 149.451s-10.144 102.15-30.15 149.451c-14.563 34.429-33.869 66.22-57.583 94.892z"
          fill=""
          p-id="2679"
        ></path>
        <path
          d="M512 220.223c-88.224 0-160 71.776-160 160s71.776 160 160 160c88.225 0 160-71.775 160-160s-71.775-160-160-160z m0 256c-52.935 0-96-43.065-96-96s43.065-96 96-96 96 43.065 96 96-43.065 96-96 96z"
          fill=""
          p-id="2680"
        ></path>
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useWebStore, useUserStore } from '@/store'
import { useRoute, useRouter } from 'vue-router'

const webStore = useWebStore()
const userStore = useUserStore()
const route = useRoute()
const router = useRouter()
</script>

<style lang="scss" scoped>
.headers {
  display: flex;
  background-color: rgb(255, 255, 255);
  padding: 0 20px;
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
  }
  .user {
    width: 50px;
    position: relative;
    & > .menu {
      position: absolute;
      width: 120px;
      background-color: #ddd;
      top: 100%;
      left: 50%;
      transform: translateX(-60%);
      text-align: center;
      display: none;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      .name {
        font-size: 17px;
        width: 100%;
        padding: 15px 0;
        border-bottom: 1px solid white;
      }
      .switch {
        width: 100%;
        padding: 10px 0;
        font-size: 13px;
        &:hover {
          background-color: #eee;
        }
      }
      &::before {
        content: '';
        border-bottom: 10px solid #ddd;
        border-right: 10px solid transparent;
        border-left: 10px solid transparent;
        position: absolute;
        top: 0%;
        left: 45%;
        transform: translateY(-9px);
      }
    }
    &:hover > .menu {
      display: flex;
    }
    svg {
      margin-top: 20%;
      width: 60%;
      height: 60%;
    }
  }
  .fill {
    flex: 1;
    &:hover {
      background-color: transparent;
    }
  }
}
</style>
