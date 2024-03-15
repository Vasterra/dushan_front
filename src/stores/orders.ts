import { defineStore } from "pinia"
import { LocationType, LocationTravelItem, AdditionalStopType, Price } from "../../types"
import { useApi } from "@/stores/api"

export const useOrderStore = defineStore("orders", {
  state: () => ({
    api: useApi().request(),
    locations: [],
    travels: [],
    pickup_location: null,
    drop_off_location: null,
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
      is_pm: false,
      stops: [],
      location_travel_id: null,
    },
  }),
  getters: {
    getCarTypes(state) {
      /* eslint-disable */
      // @ts-ignore
      const travel = this.getTravel

      return travel?.prices?.map(function (price: Price) {
        return price.car_type
      })
    },
    getCoords(state) {
      const coords = []
      /* eslint-disable */
      // @ts-ignore
      coords.push(state.pickup_location.coords)
      state.form.stops.map(function (stop) {
        /* eslint-disable */
        // @ts-ignore
        coords.push(stop.coords)
      })
      /* eslint-disable */
      // @ts-ignore
      coords.push(state.drop_off_location.coords)

      return coords
    },
    getTravel(state): LocationTravelItem | null {
      const data = state.travels.find(
        (x: LocationTravelItem) =>
          x.pickup_location_id === state.form.pickup_location_id &&
          x.drop_off_location_id === state.form.drop_off_location_id,
      )

      /* eslint-disable */
      // @ts-ignore
      state.form.location_travel_id = data !== undefined ? data.id : null
      console.log(data !== undefined ? data : null)
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
      if (!state.form.pickup_location_id) {
        return state.locations
      }
      let data = []
      data = state.locations.filter(
        (x: LocationType) =>
          x.pickup_travels?.find(
            (x: LocationTravelItem) => x.drop_off_location_id === state.form.drop_off_location_id,
          ) !== undefined,
      )
      /* eslint-disable */
      // @ts-ignore
      if (state.form.pickup_location_id) {
        data = [{ id: null, name: "Reset" }, ...data]
      } else {
        data = data.length > 0 ? data : state.locations
      }

      /* eslint-disable */
      // @ts-ignore
      if (!this.getTravel) {
        state.form.pickup_location_id = null
        state.pickup_location = null
      }

      return data
    },
    getDropOffLocations(state) {
      if (!state.form.drop_off_location_id) {
        return state.locations
      }
      let data = []
      data = state.locations.filter(
        (x: LocationType) =>
          x.drop_off_travels?.find(
            (x: LocationTravelItem) => x.pickup_location_id === state.form.pickup_location_id,
          ) !== undefined,
      )
      /* eslint-disable */
      // @ts-ignore
      if (state.form.drop_off_location_id) {
        data = [{ id: null, name: "Reset" }, ...data]
      } else {
        data = data.length > 0 ? data : state.locations
      }

      /* eslint-disable */
      // @ts-ignore
      if (!this.getTravel) {
        state.form.drop_off_location_id = null
        state.drop_off_location = null
      }
      return data
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
    storeRequest(state) {
      return {
        ...state.form,
        ...{ stops_id: state.form.stops.map((x: AdditionalStopType) => x.id) ?? [] },
      }
    },
  },
  actions: {
    getLocations() {
      this.api.get(`/api/locations`).then(res => {
        this.locations = res ? res.data : []
      })
    },
    getLocationTravels() {
      this.api.get(`/api/locations/travels`).then(res => {
        this.travels = res ? res.data : []
      })
    },
    getAdditionalStops(travel?: LocationTravelItem): AdditionalStopType[] {
      return travel ? travel.added_stops : []
    },
    // @ts-ignore
    storeOrder() {
      return (
        this.api
          // @ts-ignore
          .post(`/api/orders`, this.storeRequest)
          .then(res => {
            return res ? res.data : null
          })
      )
    },

    getOrder(uuid: string) {
      return this.api.get(`/api/orders/${uuid}`).then(res => {
        return res ? res.data : null
      })
    },
  },
})
