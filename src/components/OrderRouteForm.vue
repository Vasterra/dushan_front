<script lang="ts" setup>
	import Card from "@/components/WhiteCard"
</script>
<template>
	<div class="route-form">
		<div class="route-form__title">Need a ride?</div>
		<div class="route-form__desc">Enjoy it, we drive</div>

		<Card class="row">
			<template #name>Route</template>
		</Card>
	</div>
</template>
<style lang="scss" scoped>
	.route-form {
		&__title {
			@include font(route-form-title);
		}

		&__desc {
			@include font(route-form-desc);
		}

		.row {

		}
	}

	.order-form {

	}
</style>