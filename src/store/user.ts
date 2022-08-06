import { defineStore } from 'pinia'

const useUserStore = defineStore('search', {
  state: () => {
    return {
      login: false,
      name: '',
    }
  },
  getters: {},
  actions: {},
})

export default useUserStore
