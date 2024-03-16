import { defineStore } from "pinia"
import { useApi } from "@/stores/api"
import router from "@/router"

export const useAdminAuthStore = defineStore("admin-auth", {
  state: () => ({
    isDisabled: false,
    form: {
      email: null,
      password: null,
    },
    api: useApi(),
  }),
  actions: {
    login() {
      this.isDisabled = true
      this.api
        .request()
        .post("/api/admin/login", this.form)
        .then(res => {
          this.isDisabled = false
          if (res?.data.token) {
            this.api.setCookie("jwtToken", res?.data.token, res?.data.expires_in)
            router.push({ name: "adminOrders" })
          }
        })
    },
  },
})
