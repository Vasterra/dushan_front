import { defineStore } from "pinia"
import axios from "axios"

export const useStripeStore = defineStore("stripe", {
  state: () => ({
    session: null,
  }),
  actions: {
    async createSession(orderUuid: string) {
      await axios.get(`http://127.0.0.1:8000/api/stripe/session-id/${orderUuid}`).then(({ data }) => {
        this.session = data
      })
    },
  },
})
