import { reqLogin, reqRegister, LoginParams, RegisterParams, reqGetInfo } from '@/api'
import { defineStore } from 'pinia'

const useUserStore = defineStore('user', {
  state: () => {
    return {
      logined: false,
      name: '',
    }
  },
  getters: {},
  actions: {
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
