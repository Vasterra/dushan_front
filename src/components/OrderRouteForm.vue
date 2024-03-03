<script lang="ts" setup>
	/* eslint-disable */
	import Card from "@/components/WhiteCard"
	import CustomInput from "@/components/ui/CustomInput"
	import CustomLocations from "@/components/ui/CustomLocations"
	import CustomDateTime from "@/components/ui/CustomDateTime"
	import CustomDropdown from "@/components/ui/CustomDropdown"
	import PassengerDropdown from "@/components/ui/PassengerDropdown"
	import CustomButton from "@/components/ui/CustomButton"
	import LineArrowIcon from "@/components/icons/LineArrowIcon"
	import { reactive, ref } from "vue";
	import { useOrderStore } from "@/stores";
	import { DropdownItem, PassengerResult } from "../../types";

	const props = defineProps<{
		step: number
		isDisabled: boolean
	}>()

	const info = reactive({
		notes: "",
		departure_date: "",
		departure_time: "",
		is_pm: true,
		pickup_location_id: 0,
		drop_off_location_id: 0,
		car_type_id: 0,
		adults: 0,
		children: 0,
	})

	const items = ref([
		{id: 1, name: "Sedan"},
		{id: 2, name: "Minivan"},
		{id: 3, name: "Luxury sedan"},
	])

	const store = useOrderStore();

	const emit = defineEmits(['save', 'updateInfo'])

	const save = () => {
		emit('save')
	}
	const updateInfo = () => {
		emit('updateInfo', info)
	}

	const selectPickupLocation = (item: DropdownItem) => {
		info.pickup_location_id = item.id
		updateInfo()
	}

	const selectDropOffLocation = (item: DropdownItem) => {
		info.drop_off_location_id = item.id
		updateInfo()
	}

	const selectCarType = (item: DropdownItem) => {
		info.car_type_id = item.id
		updateInfo()
	}

	const updatePassengers = (item: PassengerResult) => {
		info.adults = item.adults
		info.children = item.children
		updateInfo()
	}

	const updateDate = (value: string) => {
		info.departure_date = value;
		updateInfo()
	}

	const updateTime = (value: string) => {
		info.departure_time = value;
		updateInfo()
	}

	const updateSwitchTime = (value: boolean) => {
		info.is_pm = value;
		updateInfo()
	}
</script>
<template>
	<Card class="card__row">
		<template #name>Route</template>
		<template #body>
			<div class="body-card" :class="{'step-2': step === 2}">
				<div>
					<CustomLocations @selectPickupLocation="selectPickupLocation" @selectDropOffLocation="selectDropOffLocation"
													 class="body-card__locations"/>
				</div>
				<div>
					<CustomDateTime class="body-card__datetime" @updateDate="updateDate" @updateTime="updateTime"
													@updateSwitchTime="updateSwitchTime"/>
					<p class="text-gray text-info">Not less than 48 hours from the current date</p>
				</div>
				<div class="body-card__row">
					<CustomDropdown @select="selectCarType" :items="items" label="Car type *" id="car_type" name="car_type"
													class="w-100"/>
					<PassengerDropdown @update="updatePassengers" label="Number of the passengers*" class="w-100"/>
				</div>
				<div class="body-card__btn" v-if="step === 1">
					<CustomButton text="Search a trip" :with-icon="true" class="button" :is-disabled="isDisabled"
												@click.prevent.stop="save">
						<template #icon>
							<LineArrowIcon/>
						</template>
					</CustomButton>
				</div>
				<CustomInput label="Custom notes"
										 v-if="step === 2"
										 id="custom_notes"
										 name="custom_notes"
										 v-model="info.notes"
										 :is-textarea="true"/>
			</div>
		</template>
	</Card>
</template>
<style lang="scss">
	.body-card {
		display: grid;
		grid-template-columns: 1fr;
		gap: 12px;

		@include breakpoint(xs) {
			gap: 24px;
			grid-template-columns: repeat(2, 1fr);
		}

		&__row {
			width: 100%;
			display: flex;
			gap: 20px;
			flex-direction: column;
			@include breakpoint(xs) {
				flex-direction: row;
			}
		}

		&__btn {
			display: flex;
			align-items: flex-end;
			justify-content: center;
			width: 100%;

			.button {
				width: 100%;
			}

			@include breakpoint(xs) {
				align-items: flex-end;
				justify-content: flex-end;

				.button {
					width: auto;
				}
			}
		}

		&.step-2 {
			grid-template-columns: 1fr !important;

			.body-card {
				&__row {
					flex-direction: column;
				}
			}
		}
	}
</style>