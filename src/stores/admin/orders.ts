import { defineStore } from "pinia"
import { useApi } from "@/stores/api"
import router from "@/router"

export const useAdminOrdersStore = defineStore("admin-orders", {
  state: () => ({
    api: useApi().request(),
    orders: [],
  }),
  actions: {
    getOrders() {
      this.api.post("/api/admin/orders").then(res => {
        this.orders = res?.data.data
      })
    },
  },
})
