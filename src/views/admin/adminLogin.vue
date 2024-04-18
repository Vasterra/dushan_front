<script lang="ts" setup>
	import { useEventBus } from "@vueuse/core";
	import { onMounted } from "vue";
	import { useAdminAuthStore } from "@/stores/admin/auth";
	import CustomLogo from "@/components/CustomLogo.vue"
	import CustomInput from "@/components/ui/CustomInput"
	import CustomButton from "@/components/ui/CustomButton"

	const changeBgColor = useEventBus('changeBgColor')
	const setStep = useEventBus('setStep')
	const store = useAdminAuthStore();
	onMounted(() => {
		changeBgColor.emit('white');
		setStep.emit(1)
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
				<form name="login-form" @submit.prevent.stop="store.login()">
					<CustomInput label="Email" id="email" name="email" type="email" v-model="store.form.email"/>
					<CustomInput
						style="margin-top: 12px;"
						label="Password"
						id="password"
						name="password"
						type="password"
						v-model="store.form.password"/>
					<div style="margin-top: 12px;" class="flex justify-content-center w-100">
						<CustomButton text="Sign in" class="button w-100" :is-disabled="store.isDisabled" type="submit"/>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>
<style lang="scss" scoped>
	form {
		max-width: 100%;
		margin: 0 auto;
		width: 100%;
		@include breakpoint(xs) {
			max-width: 536px;
		}
	}
</style>