import { defineStore } from "pinia"
import axios from "axios"
import { LocationType, LocationTravelItem, AdditionalStopType, Price } from "../../types"

export const useOrderStore = defineStore("orders", {
  state: () => ({
    locations: [],
    travels: [],
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
      stops: [],
    },
  }),
  getters: {
    getTravel(state): LocationTravelItem | null {
      const data = state.travels.find(
        (x: LocationTravelItem) =>
          x.pickup_location_id === state.form.pickup_location_id &&
          x.drop_off_location_id === state.form.drop_off_location_id,
      )
      return data !== undefined ? data : null
    },
    getCost(state) {
      /* eslint-disable */
      // @ts-ignore
      const travel = this.getTravel
      const travelCost =
        travel !== null ? travel.prices.find((x: Price) => x.car_type_id === state.form.car_type_id).price : 0
      /* eslint-disable */
      // @ts-ignore
      const allCountPassengers = this.countPassengers
      const stopsCost = Object.values(
        state.form.stops.map((item: AdditionalStopType) =>
          allCountPassengers === 8 ? item.price_for_8_pax : item.price,
        ),
      ).reduce((acc, val) => acc + val, 0)
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "EUR",
        maximumFractionDigits: 3,
      }).format(travelCost + stopsCost)
    },
    getPickupLocations(state) {
      const data = state.locations.filter(
        (x: LocationType) =>
          x.pickup_travels?.find(
            (x: LocationTravelItem) => x.drop_off_location_id === state.form.drop_off_location_id,
          ) !== undefined,
      )
      return data.length ? data : state.locations
    },
    getDropOffLocations(state) {
      const data = state.locations.filter(
        (x: LocationType) =>
          x.drop_off_travels?.find(
            (x: LocationTravelItem) => x.pickup_location_id === state.form.pickup_location_id,
          ) !== undefined,
      )
      return data.length ? data : state.locations
    },
    countPassengers(state) {
      return state.form.adults + state.form.children
    },
    isValidStepFirst(): boolean {
      return (
        this.form.departure_date !== null &&
        this.form.departure_time !== null &&
        this.form.departure_date !== "" &&
        this.form.departure_time !== "" &&
        this.form.adults > 0 &&
        (this.form.adults > 0 || this.form.children > 0) &&
        this.form.pickup_location_id !== null &&
        this.form.drop_off_location_id !== null &&
        this.form.car_type_id !== null
      )
    },
    isValidStepSecond(): boolean {
      return (
        /* eslint-disable */
        // @ts-ignore
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
  actions: {
    getLocations() {
      axios.get("http://127.0.0.1:8000/api/locations").then(({ data }) => {
        this.locations = data
      })
    },
    getLocationTravels() {
      axios.get("http://127.0.0.1:8000/api/locations/travels").then(({ data }) => {
        this.travels = data
      })
    },
    getAdditionalStops(travel?: LocationTravelItem): AdditionalStopType[] {
      return travel ? travel.added_stops : []
    },
  },
})
