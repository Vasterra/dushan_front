<script lang="ts" setup>
	/* eslint-disable */
	import Card from "@/components/WhiteCard"
	import CustomLogo from "@/components/CustomLogo.vue"
	import OrderRouteForm from '@/components/OrderRouteForm'
	import OrderPersonalInfoForm from '@/components/OrderPersonalInfoForm'
	import CustomButton from "@/components/ui/CustomButton"
	import AdditionalStopCard from "@/components/AdditionalStopCard"
	import CustomStripe from "@/components/CustomStripe"
	import YandexMap from "@/components/YandexMap"
	import GoogleMap from "@/components/GoogleMap"
	import { ref } from "vue";
	import { useOrderStore } from "@/stores";
	import { useEventBus } from "@vueuse/core";
	import { AdditionalStopType, OrderRouteFormType } from "../../types";

	const checkoutSubmit = useEventBus('checkoutSubmit')
	const changeIsOpenLoaderModal = useEventBus("changeIsOpenLoaderModal")
	const setStep = useEventBus('setStep')

	const step = ref(1);
	const store = useOrderStore();
	const changeBgColor = useEventBus('changeBgColor')

	const updateRouteForm = (data: OrderRouteFormType) => {
		if (store.form.pickup_location_id !== data.pickup_location_id || store.form.drop_off_location_id !== data.drop_off_location_id) {
			store.form.stops = []
		}
		// @ts-ignore
		store.form.pickup_location_id = data.pickup_location_id;
		// @ts-ignore
		store.form.drop_off_location_id = data.drop_off_location_id;
		// @ts-ignore
		store.pickup_location = data.pickup_location;
		// @ts-ignore
		store.drop_off_location = data.drop_off_location;
		// @ts-ignore
		store.form.car_type_id = data.car_type_id;
		// @ts-ignore
		store.form.adults = data.adults;
		// @ts-ignore
		store.form.children = data.children;
		// @ts-ignore
		store.form.departure_time = data.departure_time;
		// @ts-ignore
		store.form.departure_date = data.departure_date;
		// @ts-ignore
		store.form.is_pm = data.is_pm;
	}

	const updatePersonalInfo = (data) => {
		store.form.first_name = data.first_name;
		store.form.last_name = data.last_name;
		store.form.email = data.email;
		store.form.phone = data.phone;
	}

	const order = ref()

	const saveRouteForm = () => {
		// @ts-ignore
		if (store.isValidStepFirst) {
			step.value = 2;
			setStep.emit(2);
			changeBgColor.emit('white')
		}
	}

	const openStripe = async () => {
		// @ts-ignore
		if (store.isValidStepSecond) {
			changeIsOpenLoaderModal.emit(true);
			const data = await store.storeOrder();
			if (data?.id) {
				// step.value = 3
				changeBgColor.emit('black')
				checkoutSubmit.emit(data.uuid);
			}
		}
	}

	const addStop = (stop: AdditionalStopType) => {
		store.form.stops.push(stop)
	}

	const removeStop = (stop: AdditionalStopType) => {
		// @ts-ignore
		store.form.stops = store.form.stops.filter(x => x.id !== stop.id)
	}
</script>
<template>
	<CustomStripe/>
	<picture v-if="step !== 2">
		<source media="(min-width:568px)"
						srcset="~@/assets/images/bg-image.png">
		<source media="(min-width:320px)"
						srcset="~@/assets/images/bg-image-mobile.png">
		<img
			src="~@/assets/images/bg-image.png"
			alt="Flowers">
	</picture>
	<div class="wrapper">
		<CustomLogo class="logo" :step="step"/>
		<div class="dashboard-page" :class="{'step-2': step === 2, 'step-3': step === 3}">
			<!--			<template v-if="step !== 3">-->
			<div class="dashboard-page__col">
				<template v-if="step === 1">
					<div class="dashboard-page__title">Need a ride?</div>
					<div class="dashboard-page__desc">Enjoy it, we drive</div>
				</template>
				<OrderRouteForm :is-disabled="!store.isValidStepFirst" class="OrderRouteForm" @save="saveRouteForm"
												@updateInfo="updateRouteForm" :step="step"/>
				<template v-if="step === 2">
					<OrderPersonalInfoForm @updateInfo="updatePersonalInfo"/>
					<Card class="card__row" :with-title="true">
						<template #name>Final cost: {{ store.isValidStepSecond ? store.getCost : "" }}</template>
						<template #body>
							<p class="text-gray text-info cost" v-if="!store.isValidStepSecond">
								To see the final cost, you need to fill in all the fields
							</p>
						</template>
					</Card>
					<CustomButton text="Pay and Complete" :is-disabled="!store.isValidStepSecond"
												@click.stop.prevent="openStripe"/>
					<Card class="card__row" :with-title="false">
						<template #body>
							<GoogleMap :origin="store.getOriginCoords" :destination="store.getDestinationCoords"
												 :waypoints="store.getWaypointsCoords"/>
							<!--							<YandexMap :coords-items="store.getCoords"/>-->
						</template>
					</Card>
				</template>
			</div>
			<div class="dashboard-page__col" v-if="step === 2">
				<Card class="card__row" :with-title="true">
					<template #name>Additional stops</template>
					<template #body>
						<div class="stops">
							<template v-for="item in store.getAdditionalStops(store.getTravel)" :key="item.id">
								<AdditionalStopCard class="w-100" :item="item" :count-passengers="store.countPassengers"
																		@remove="removeStop"
																		@add="addStop"/>
							</template>
						</div>
					</template>
				</Card>
			</div>
			<!--			</template>-->
		</div>
	</div>
</template>
<style lang="scss">

	.logo {
		position: absolute;
		top: 16px;
		left: 16px;
		@include breakpoint(xs) {
			top: 32px;
			left: 24px;
		}
	}

	picture {
		position: absolute;
		z-index: -1;
		top: 0;
		left: 0;
		//height: 100vh;
		//overflow: hidden;
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		@include breakpoint(xs) {
			//overflow: auto;
		}

		img {
			width: 100vw;
			height: 100vh;
			object-fit: cover;
			transform: scale(1.3);
			object-position: 50% 40px;
			@include breakpoint(xs) {
				object-position: 0 0;
				transform: scale(1);
			}
		}
	}

	.text-info {
		margin: 4px 10px 0;
		@include font(route-form-desc-mobile);

		&.cost {
			margin: 4px 0;
		}
	}

	.text-gray {
		color: $gray;
	}

	.dashboard-page {
		display: grid;
		grid-template-columns: 1fr;
		gap: 16px;

		padding-top: 190px;
		@include breakpoint(xs) {
			padding-top: 300px;
		}

		&__title {
			color: $white;
			@include font(route-form-title-mobile);
			@include breakpoint(xs) {
				@include font(route-form-title);
			}
		}

		&__desc {
			color: $white;
			@include font(route-form-desc-mobile);
			margin-bottom: 24px;
			@include breakpoint(xs) {
				@include font(route-form-desc);
				margin-bottom: 44px;
			}
		}

		&.step-2 {
			grid-template-columns:1fr;
			padding-top: 66px;
			@include breakpoint(xs) {
				padding-top: 100px;
				grid-template-columns: repeat(2, 1fr);
			}
		}

		&.step-4 {
			padding-top: 140px;

			.dashboard-page__col {
				height: auto;
				display: flex;
				align-items: center;
				justify-content: center;
				//position: absolute;
				position: relative;
				top: 0;
				left: 0;
				width: 100%;
				@include breakpoint(xs) {
					position: relative;
					display: block;
					height: 100%;
				}
			}
		}

		&__col {
			display: grid;
			grid-template-columns: 1fr;
			gap: 16px;
			align-self: flex-start;
		}

		.stops {
			display: flex;
			flex-direction: column;
			gap: 16px;
			@include breakpoint(xs) {
				gap: 24px;
			}
		}
	}
</style>