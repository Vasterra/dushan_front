import { defineStore } from "pinia"
import { useApi } from "@/stores/api"

export const useStripeStore = defineStore("stripe", {
  state: () => ({
    session: null,
    api: useApi().request(),
  }),
  actions: {
    async createSession(orderUuid: string) {
      await this.api.get(`/api/stripe/session-id/${orderUuid}`).then(({ data }) => {
        this.session = data
      })
    },
  },
})
