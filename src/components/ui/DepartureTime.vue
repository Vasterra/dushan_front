<script lang="ts" setup>
	/* eslint-disable */
	import OtpInput from "@/components/ui/OtpInput"
	import CustomSwitch from "@/components/ui/CustomSwitch"
	import { ref, watch } from "vue";

	const otpValue = ref('0800')
	const valueSwitch = ref(false)

	const emit = defineEmits(['updateTime', 'updateSwitchTime'])

	watch(() => otpValue.value, () => {
		if (otpValue.value) {
			emit('updateTime', otpValue.value)
		}
	})

	watch(() => valueSwitch.value, () => {
		emit('updateSwitchTime', valueSwitch.value)
	})
</script>
<template>
	<div class="departure-time">
		<div class="departure-time__label">Departure Time*</div>
		<div class="departure-time__time time">
			<OtpInput :digit-count="4"
								default="0800"
								class="time__item"
								@update:otp="otpValue = $event"></OtpInput>
			<div class="separator">:</div>
		</div>
		<CustomSwitch v-model="valueSwitch"/>
	</div>
</template>
<style lang="scss" scoped>
	.departure-time {
		display: flex;
		align-items: flex-end;
		justify-content: flex-start;
		background-color: #fff;
		position: relative;
		gap: 12px;
		width: 100%;
		border-radius: 8px;

		@include font(input-mobile);
		padding: 13px 12px 4px;
		height: 44px;
		@include breakpoint(xs) {
			padding: 24px 16px 4px;
			height: 54px;
			@include font(input);
		}

		&__label {
			color: $gray;
			position: absolute;
			top: 0;
			background: $white;
			left: 9px;
			transform: translate(0, 50%);
			padding: 0 6px;
			@include font(input-label-fill-mobile);

			@include breakpoint(xs) {
				@include font(input-label-fill);
			}
		}

		&__time {
			display: flex;
			align-items: center;
			justify-content: center;
			position: relative;

			.time__item {
				display: flex;
				align-items: center;
				justify-content: center;
			}

			.separator {
				position: absolute;
			}
		}
	}

</style>