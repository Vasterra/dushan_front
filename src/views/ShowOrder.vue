<script lang="ts" setup>
	import CustomLogo from "@/components/CustomLogo.vue"
	import SuccessOrderForm from '@/components/SuccessOrderForm'
	import { useRoute } from "vue-router";
	import { onMounted, ref } from "vue";
	import { useOrderStore } from "@/stores";
	import { useEventBus } from "@vueuse/core";

	const route = useRoute();
	const uuid = ref(route.params.uuid?.toString() ?? "")
	const order = ref()
	const store = useOrderStore();
	const setStep = useEventBus('setStep')

	onMounted(async () => {
		order.value = await store.getOrder(uuid.value)
		setStep.emit(4)
	})
</script>
<template>
	<picture>
		<source media="(min-width:568px)"
						srcset="~@/assets/images/bg-image.png">
		<source media="(min-width:320px)"
						srcset="~@/assets/images/bg-image-mobile.png">
		<img
			src="~@/assets/images/bg-image.png"
			alt="Flowers">
	</picture>
	<div class="wrapper">
		<CustomLogo class="logo" :step="4"/>
		<div class="dashboard-page step-4">
			<div class="dashboard-page__col">
				<SuccessOrderForm :order="order" v-if="order"/>
			</div>
		</div>
	</div>
</template>