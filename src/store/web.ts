import { defineStore } from 'pinia'
import { WebInfo } from '@/interface'
import { reqWebList, reqAddWeb, reqEditWeb, reqDeleteWeb, AddParams, EditParams } from '@/api'

const useWebStore = defineStore('web', {
  state: () => {
    return {
      webList: <WebInfo[]>[],
      webId: -1,
    }
  },
  getters: {},
  actions: {
    async getWebs() {
      const { code, data } = await reqWebList()
      if (code == 0) {
        this.webList = data.webList
        this.webId = data.webList[0]?.webId || -1
        return
      }
      throw Error()
    },
    async addWeb(params: AddParams) {
      const { code } = await reqAddWeb(params)
      if (code == 0) {
        this.getWebs()
      } else {
        throw Error()
      }
    },
    async editWeb(params: EditParams) {
      const { code } = await reqEditWeb(params)
      if (code == 0) {
        this.getWebs()
      } else {
        throw Error()
      }
    },
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
