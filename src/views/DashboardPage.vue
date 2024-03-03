<script lang="ts" setup>
	import { useOrderStore } from "@/stores/orders";
	import OrderRouteForm from '@/components/OrderRouteForm'
	// import OrderRou

	const orderStore = useOrderStore()
</script>
<template>
	<div class="dashboard">
		<OrderRouteForm/>
		<!--		<div class="dashboard__bg">-->
		<!--			     <img src="~@/assets/images/bg-image.png" alt="bg-image.png">-->
		<!--		</div>-->
		<!--		<div class="wrapper">-->
		<!--			<div class="dashboard__content">-->
		<!--				<div class="dashboard__content&#45;&#45;title">Need a ride?</div>-->
		<!--				<div class="dashboard__content&#45;&#45;description">Enjoy it, we drive</div>-->
		<!--			</div>-->
		<!--		</div>-->
	</div>
</template>
<style lang="scss" scoped>
	.dashboard {
		width: 100vw;
		height: 100vh;
		background-color: $black;

		&__content {
			position: absolute;
		}
	}
</style>