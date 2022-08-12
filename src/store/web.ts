import { defineStore } from 'pinia'
import { WebInfo } from '@/interface'
import { reqWebList, reqAddWeb, reqEditWeb, reqDeleteWeb, AddParams, EditParams } from '@/api'

const useWebStore = defineStore('web', {
  state: () => {
    return {
      webList: <WebInfo[]>[], // 用户网站信息
      webId: -1, // 当前网站，-1表示尚未拥有网站信息
    }
  },
  getters: {},
  actions: {
    // 获取网站列表
    async getWebs() {
      const { code, data } = await reqWebList()
      if (code == 0) {
        this.webList = data.webList
        this.webId = data.webList[0]?.webId || -1
        return
      }
    },
    // 添加网站
    async addWeb(params: AddParams) {
      const { code } = await reqAddWeb(params)
      if (code == 0) {
        this.getWebs()
      } else {
        throw Error()
      }
    },
    // 编辑网站
    async editWeb(params: EditParams) {
      const { code } = await reqEditWeb(params)
      if (code == 0) {
        this.getWebs()
      } else {
        throw Error()
      }
    },
    // 删除网站
    async deleteWeb(webId: number) {
      const { code } = await reqDeleteWeb({ webId })
      if (code == 0) {
        this.getWebs()
      } else {
        throw Error()
      }
    },
  },
})

export default useWebStore
