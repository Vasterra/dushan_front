import { defineStore } from 'pinia'

export const useOrderStore = defineStore('orders', {
  state: () => ({}),
  getters: {
    count() {
      return 12
    }
  },
  actions: {}
})