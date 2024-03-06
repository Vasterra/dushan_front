export type DropdownItem = {
  id: number
  name: string
}

export type OrderRequest = {
  departure_date: string | null
  departure_time: string | null
  first_name: string | null
  last_name: string | null
  phone: string | null
  email: string | null
  custom_notes?: string | null
  adults: number | null
  children: number | null
  cost: number | null
  pickup_location_id: number | null
  drop_off_location_id: number | null
  car_type_id: number | null
}

export type OrderRouteFormType = {
  departure_date: string | null
  departure_time: string | null
  custom_notes?: string | null
  adults: number | null
  children: number | null
  pickup_location_id: number | null
  drop_off_location_id: number | null
  car_type_id: number | null
  is_pm: boolean
}

export type PassengerResult = {
  adults: number
  children: number
}

export type LocationType = {
  id: number
  name: string
  pickup_travels: LocationTravelItem[]
  drop_off_travels: LocationTravelItem[]
}

export type LocationTravelItem = {
  id: number
  name: string
  pickup_location_id: number
  drop_off_location_id: number
  added_stops: AdditionalStopType[]
  prices: Price[]
  uuid: string
  coords: number[]
}

export type Price = {
  car_type_id: number
  created_at: string
  deleted_at: null | string
  id: number
  location_travel_id: number
  price: number
  updated_at: string
}

export type LocationItem = {
  id: number
  name: string
  coords: number[]
}

export type AdditionalStopType = {
  created_at: string
  deleted_at: string | null
  id: number
  lat: number
  lng: number
  location_travel_id: number
  name: string
  price: number
  price_for_8_pax: number
  updated_at: string
  photo: string | null
  uuid: string
  coords: number[]
  location_stop?: LocationItem
}

export interface CarTypeItem {
  created_at: string
  deleted_at: string | null
  icon: string | null
  id: number
  name: string
  updated_at: string
}

export interface OrderItem {
  id: number
  is_pm: boolean
  adults: number
  children: number
  departure_date: string
  departure_time: string
  car_type: CarTypeItem
  drop_off_location: LocationItem
  pickup_location: LocationItem
  stops: AdditionalStopType[]
}
