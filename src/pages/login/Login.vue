<template>
  <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
    <h1 class="text-3xl font-semibold text-slate-700 font-serif">MonisTer</h1>
    <input
      v-if="!isLogin"
      v-model="name"
      class="w-96 block mt-4 p-2 border border-solid border-slate-600 rounded-lg"
      type="text"
      placeholder="请输入用户名"
    >
    <input
      v-model="email"
      class="w-96 block mt-4 p-2 border border-solid border-slate-600 rounded-lg"
      type="text"
      placeholder="请输入邮箱"
    >
    <input
      v-model="password"
      class="w-96 block mt-4 p-2 border border-solid border-slate-600 rounded-lg"
      type="password"
      placeholder="请输入密码"
    >
    <div class="text-slate-400 text-left text-sm ml-1 mt-1 cursor-pointer hover:text-slate-300" @click="isLogin = !isLogin">
      <span v-if="!isLogin">已有登录邮箱</span>
      <span v-else>我要注册</span>
    </div>
    <button class="btn bg-slate-300 text-slate-700 hover:bg-slate-400" @click.prevent="loginOrRegister">
      <span v-if="isLogin">登录</span>
      <span v-else>注册</span>
    </button>
  </div>
</template>

<script setup lang="ts">

import { reqLogin, reqRegister } from '@/api';
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';

const isLogin = ref(true)

const router = useRouter()

let email = $ref('')
let password = $ref('')
let name = $ref('')

const loginOrRegister = () => {
  if(isLogin.value) {
    console.log('login')
    reqLogin({
      email: email,
      password: password,
    }).then((response) => {
      email = ''
      password = ''
      console.log('success')
      localStorage.setItem('token', response.data.token )
      router.push('/home')
    }).catch(()=>{
      console.log('fail')
    })
  } else {
    console.log('register')
    reqRegister({
      email: email,
      name: name,
      password: password,
    }).then(() => {
      name = ''
      email = ''
      password = ''
      console.log('success')
      router.push('/home')
    }).catch(() => {
      console.log('fail')
    })
  }

}

// const loginParams = reactive({
//   email: '',
//   password: '',
// })

</script>

