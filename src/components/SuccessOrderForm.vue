<script lang="ts" setup>
	import { reactive } from "vue";
	import CustomButton from "@/components/ui/CustomButton"
	import CarTypeIcon from "@/components/icons/SuccessOrder/CarTypeIcon"
	import DateIcon from "@/components/icons/SuccessOrder/DateIcon"
	import AdditionalStopsIcon from "@/components/icons/SuccessOrder/AdditionalStopsIcon"
	import PassengersIcon from "@/components/icons/SuccessOrder/PassengersIcon"
	import DropOffLocationIcon from "@/components/icons/SuccessOrder/DropOffLocationIcon"
	import PickupLocationIcon from "@/components/icons/SuccessOrder/PickupLocationIcon"
	import TimeIcon from "@/components/icons/SuccessOrder/TimeIcon"

	const order = reactive({
		departure_date: "March 12, 2024",
		departure_time: "09:20 AM",
		pickup_location: {
			name: "Vienna"
		},
		drop_off_location: {
			name: "Prague"
		},
		additional_stops: "Parndorf Outlet, Bratislava, Schloss Esterhazy, Pannonhalma Archabbey, Esztergom",
		car_type: {
			name: 'Sedan'
		},
		passengers: "2 adults, 2 children"
	})
</script>
<template>
	<div class="success-order">
		<p class="success-order__title">
			<span>Booking is made successfully!</span>
		</p>
		<div class="success-order__card card">
			<div class="card__item">
				<div class="card__item--icon">
					<DateIcon width="16" height="16"/>
				</div>
				<div class="card__item--info">
					<div class="info__title">Departure Date</div>
					<p class="info__desc">{{ order.departure_date }}</p>
				</div>
			</div>
			<div class="card__item">
				<div class="card__item--icon">
					<TimeIcon width="16" height="16"/>
				</div>
				<div class="card__item--info">
					<div class="info__title">Departure Time</div>
					<p class="info__desc">{{ order.departure_time }}</p>
				</div>
			</div>
			<div class="card__item">
				<div class="card__item--icon">
					<PickupLocationIcon width="16" height="16"/>
				</div>
				<div class="card__item--info">
					<div class="info__title">Pick-up Locations</div>
					<p class="info__desc">{{ order.pickup_location.name }}</p>
				</div>
			</div>
			<div class="card__item">
				<div class="card__item--icon">
					<DropOffLocationIcon width="16" height="16"/>
				</div>
				<div class="card__item--info">
					<div class="info__title">Drop-off Locations</div>
					<p class="info__desc">{{ order.drop_off_location.name }}</p>
				</div>
			</div>
			<div class="card__item">
				<div class="card__item--icon">
					<AdditionalStopsIcon width="16" height="16"/>
				</div>
				<div class="card__item--info">
					<div class="info__title">Additional stops</div>
					<p class="info__desc">{{ order.additional_stops }}</p>
				</div>
			</div>
			<div class="card__item">
				<div class="card__item--icon">
					<CarTypeIcon width="16" height="16"/>
				</div>
				<div class="card__item--info">
					<div class="info__title">Car type</div>
					<p class="info__desc">{{ order.car_type.name }}</p>
				</div>
			</div>
			<div class="card__item">
				<div class="card__item--icon">
					<PassengersIcon width="16" height="16"/>
				</div>
				<div class="card__item--info">
					<div class="info__title">Number of the passengers</div>
					<p class="info__desc">{{ order.passengers }}</p>
				</div>
			</div>
		</div>
		<div class="success-order__card">
			<p>Driver’s contacts will be sent within 24 hours via whatsapp</p>
		</div>
		<CustomButton text="Go home" class="button" @click="emit('home')"/>
	</div>
</template>
<style lang="scss" scoped>
	.success-order {
		max-width: 536px;
		margin: 0 auto;
		width: 100%;

		.button {
			width: 100%;
			margin-top: 16px;
			@include breakpoint(xs) {
				margin-top: 32px;
			}
		}

		&__title {
			color: $white;
			text-align: center;
			margin-bottom: 24px;

			display: flex;
			align-items: center;
			justify-content: center;
			@include breakpoint(xs) {
				max-width: 100%;
				margin-bottom: 32px;
			}

			span {
				max-width: 208px;
				@include font(success-order-title-mobile);
				@include breakpoint(xs) {
					max-width: 100%;
					@include font(success-order-title);
				}
			}
		}

		&__card {
			background-color: $gray-bg;
			border-radius: 8px;
			padding: 12px;
			@include breakpoint(xs) {
				padding: 24px;
			}

			&:last-of-type {
				margin-top: 8px;
			}
		}

		.card__item {
			padding: 8px 0;
			display: flex;
			align-items: center;
			justify-content: flex-start;
			@include breakpoint(xs) {
				padding: 12px 0;
			}

			&:not(:last-of-type) {
				border-bottom: 1px solid $gray-light;
			}

			&--icon {
				min-width: 32px;
				height: 32px;
				border-radius: 50%;
				background-color: $gray-light;
				display: flex;
				align-items: center;
				justify-content: center;
			}

			&--info {
				margin-left: 8px;

				.info__title {
					color: $gray;
					@include font(input-label-fill-mobile);
					@include breakpoint(xs) {
						@include font(input-label-fill);
					}
				}

				.info__desc {
					color: $black;
					margin-top: 2px;

					@include breakpoint(xs) {
						@include font(input-label);
						margin-top: 4px;
					}
				}
			}
		}
	}
</style>