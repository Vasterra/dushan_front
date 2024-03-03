<script lang="ts" setup>
	/* eslint-disable */
	import Card from "@/components/WhiteCard"
	import CustomLogo from "@/components/CustomLogo.vue"
	import OrderRouteForm from '@/components/OrderRouteForm'
	import OrderPersonalInfoForm from '@/components/OrderPersonalInfoForm'
	import SuccessOrderForm from '@/components/SuccessOrderForm'
	import CustomButton from "@/components/ui/CustomButton"
	import AdditionalStopCard from "@/components/AdditionalStopCard"
	import { ref } from "vue";
	import { useEventBus } from "@vueuse/core";

	const step = ref(1);

	const changeBgColor = useEventBus('changeBgColor')

	const saveRouteForm = (data) => {
		step.value = 2;
		changeBgColor.emit('white')

	}

	const openStripe = () => {
		step.value = 4

		changeBgColor.emit('black')
	}
</script>
<template>
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
		<div class="dashboard-page" :class="{'step-2': step === 2, 'step-3': step === 3, 'step-4': step === 4}">
			<template v-if="step !== 4 && step !== 3">
				<div class="dashboard-page__col">
					<template v-if="step === 1">
						<div class="dashboard-page__title">Need a ride?</div>
						<div class="dashboard-page__desc">Enjoy it, we drive</div>
					</template>
					<OrderRouteForm class="OrderRouteForm" @save="saveRouteForm" :step="step"/>
					<template v-if="step === 2">
						<OrderPersonalInfoForm/>
						<Card class="card__row">
							<template #name>Final cost:</template>
							<template #body>
								<p class="text-gray text-info cost">To see the final cost, you need to fill in all the fields</p>
							</template>
						</Card>
						<CustomButton text="Pay and Complete" @click.stop.prevent="openStripe"/>
					</template>
				</div>
				<div class="dashboard-page__col" v-if="step === 2">
					<Card class="card__row">
						<template #name>Additional stops</template>
						<template #body>
							<div class="stops">
								<template v-for="i in 10">
									<AdditionalStopCard class="w-100"/>
								</template>
							</div>
						</template>
					</Card>
				</div>
			</template>

			<SuccessOrderForm v-if="step === 4"/>
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

		img {
			width: 100vw;
			height: 100vh;
			object-fit: cover;
			object-position: 50% -40px;
			@include breakpoint(xs) {
				object-position: 0 0;
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