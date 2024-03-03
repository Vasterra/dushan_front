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
