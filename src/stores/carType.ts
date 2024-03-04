import { defineStore } from "pinia"
import axios from "axios"

export const useCarTypeStore = defineStore("carTypes", {
  state: () => ({
    carTypes: [],
  }),
  actions: {
    getCarTypes() {
      axios.get("http://127.0.0.1:8000/api/car_types").then(({ data }) => {
        this.carTypes = data
      })
    },
  },
})
