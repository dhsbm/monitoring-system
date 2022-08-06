import { defineStore } from 'pinia'
import { WebInfo } from '@/interface'

const useWebStore = defineStore('search', {
  state: () => {
    return {
      webList: <WebInfo[]>[],
      webId: -1,
    }
  },
  getters: {},
  actions: {},
})

export default useWebStore
