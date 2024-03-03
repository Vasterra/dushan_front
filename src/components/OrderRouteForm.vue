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
	import { reactive } from "vue";

	const props = defineProps<{
		step: number
	}>()

	const info = reactive({
		notes: null
	})

	const emit = defineEmits(['save'])

	const save = () => {
		emit('save', 323232)
	}
</script>
<template>
	<Card class="card__row">
		<template #name>Route</template>
		<template #body>
			<div class="body-card" :class="{'step-2': step === 2}">
				<div>
					<CustomLocations class="body-card__locations"/>
				</div>
				<div>
					<CustomDateTime class="body-card__datetime"/>
					<p class="text-gray text-info">Not less than 48 hours from the current date</p>
				</div>
				<div class="body-card__row">
					<CustomDropdown label="Car type *" id="car_type" name="car_type" class="w-100"/>
					<PassengerDropdown label="Number of the passengers*" class="w-100"/>
				</div>
				<div class="body-card__btn" v-if="step === 1">
					<CustomButton text="Search a trip" :with-icon="true" class="button" @click.prevent.stop="save">
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