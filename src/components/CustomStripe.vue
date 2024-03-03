<script lang="ts" setup>
	import { StripeCheckout } from '@vue-stripe/vue-stripe';
	import { reactive, ref } from "vue";

	const checkoutRef = ref(null);
	const loading = ref(false);
	const successURL = ref('');
	const cancelURL = ref('');
	const publishableKey = ref('pi_3MtwBwLkdIwHu7ix28a3tqPa_secret_YrKJUKribcBjcG8HVhfZluoGH');
	const lineItems = reactive([
		{
			price: 'some-price-id', // The id of the one-time price you created in your Stripe dashboard
			quantity: 1,
		},
	]);

	const submit = () => {
		// You will be redirected to Stripe's secure checkout page
		checkoutRef.value.redirectToCheckout();
	};
</script>
<template>
	<div>
		<stripe-checkout
			ref="checkoutRef"
			mode="payment"
			:pk="publishableKey"
			:line-items="lineItems"
			:success-url="successURL"
			:cancel-url="cancelURL"
			@loading="v => loading = v"
		/>
		<button @click="submit">Pay now!</button>
	</div>
</template>