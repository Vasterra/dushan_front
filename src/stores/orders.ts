import { defineStore } from "pinia"
import { OrderRequest } from "../../types"

export const useOrderStore = defineStore("orders", {
  state: () => ({
    form: {
      departure_date: null,
      departure_time: null,
      first_name: null,
      last_name: null,
      phone: null,
      email: null,
      custom_notes: null,
      adults: 0,
      children: 0,
      cost: null,
      pickup_location_id: null,
      drop_off_location_id: null,
      car_type_id: null,
      is_pm: true,
    },
  }),
  getters: {
    isValidStepFirst(): boolean {
      return true
      return (
        this.form.departure_date !== null &&
        this.form.departure_time !== null &&
        this.form.adults > 0 &&
        this.form.adults + this.form.children > 0 &&
        this.form.pickup_location_id !== null &&
        this.form.drop_off_location_id !== null &&
        this.form.car_type_id !== null
      )
    },
    isValidStepSecond(): boolean {
      return (
        this.isValidStepFirst &&
        this.form.first_name !== null &&
        this.form.last_name !== null &&
        this.form.phone !== null &&
        this.form.email !== null
      )
    },
    count() {
      return 12
    },
  },
  actions: {},
})
