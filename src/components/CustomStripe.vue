<script lang="ts" setup>
	/* eslint-disable */
	import { StripeCheckout } from '@vue-stripe/vue-stripe';
	import { onMounted, ref } from "vue";
	import { useStripeStore } from "@/stores/stripe";
	import { useEventBus } from "@vueuse/core";

	const checkoutSubmit = useEventBus('checkoutSubmit')
	const changeIsOpenLoaderModal = useEventBus("changeIsOpenLoaderModal")
	const submit_btn = ref(null);
	const checkoutRef = ref(null);
	const loading = ref(false);
	const publishableKey = ref('pk_test_51MshW7Lrb7JLXGH5tKzLajIO7tkbbrlbnr7CjBTWiTZxHE8q4sNKa8YXimN3AmGbLnIzp104zgC4GxBIVrF03L7Y00mRgMVMBF');
	const store = useStripeStore()

	const submit = () => {
		// You will be redirected to Stripe's secure checkout page
		checkoutRef.value.redirectToCheckout();

		setTimeout(() => {
			changeIsOpenLoaderModal.emit(false);
		}, 1200)
	};

	onMounted(async () => {
		await checkoutSubmit.on(async (uuid) => {
			changeIsOpenLoaderModal.emit(true);
			console.log(uuid)
			await store.createSession(uuid)
			submit_btn.value.click();
		})
	})
</script>
<template>
	<div>
		<stripe-checkout
			ref="checkoutRef"
			:pk="publishableKey"
			:session-id="store.session?.id"
			v-if="store.session?.id"
			@loading="v => loading = v"
		/>
		<button style="display:none;" ref="submit_btn" @click="submit">Checkout!</button>
	</div>
</template>