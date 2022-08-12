import { reqLogin, reqRegister, LoginParams, RegisterParams, reqGetInfo } from '@/api'
import { defineStore } from 'pinia'

const useUserStore = defineStore('user', {
  state: () => {
    return {
      logined: false, // 是否已登录
      name: '', // 用户昵称
    }
  },
  getters: {},
  actions: {
    // 登录
    async login(params: LoginParams) {
      const { code, data } = await reqLogin(params)
      if (code == 0) {
        this.name = data.name
        this.logined = true
        localStorage.setItem('token', data.token)
        return
      }

      throw Error()
    },
    // 注册
    async register(params: RegisterParams) {
      const { code, data } = await reqRegister(params)
      if (code == 0) {
        this.name = data.name
        this.logined = true
        localStorage.setItem('token', data.token)
        return
      }
      throw Error()
    },
    // 请求用户信息
    async getInfo() {
      const { code, data } = await reqGetInfo()
      if (code == 0) {
        this.logined = true
        this.name = data.name
        localStorage.setItem('token', data.token)
        return
      }
      throw Error()
    },
  },
})

export default useUserStore
