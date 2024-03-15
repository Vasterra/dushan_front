import { defineStore } from "pinia"
import { useApi } from "@/stores/api"

export const useCarTypeStore = defineStore("carTypes", {
  state: () => ({
    carTypes: [],
    api: useApi().request(),
  }),
  actions: {
    getCarTypes() {
      this.api.get("/api/car_types").then(({ data }) => {
        this.carTypes = data
      })
    },
  },
})
