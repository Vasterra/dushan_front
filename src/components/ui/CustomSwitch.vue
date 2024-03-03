<script lang="ts" setup>
	/* eslint-disable */

	import { computed } from "vue";

	const props = defineProps<{
		modelValue?: undefined
	}>()

	const emit = defineEmits<(e: "update:modelValue", value: string) => void>()

	const value = computed({
		get: function () {
			return props.modelValue
		},
		set(value) {
			emit("update:modelValue", value ?? "")
		},
	})
</script>
<template>
	<label class="checkSwitch">
		<input class="checkSwitch__input" type="checkbox" v-model="value"/>
		<span class="checkSwitch__switch"></span>
	</label>
</template>
<style lang="scss" scoped>
	$size: 26px;
	$width-size: 40px;

	.checkSwitch {
		position: relative;
		border-radius: $size;
		box-sizing: content-box;
		display: inline-block;
		cursor: pointer;
		height: $size;
		width: $width-size * 2;
		background-color: $gray-light;
		overflow: hidden;

		&__input {
			position: absolute;
			left: -100%;
		}

		&__switch {
			display: block;
			background: $red;
			border-radius: 100px;
			width: $width-size;
			height: $size;
			font-size: 12px;
			transition: transform 200ms ease, background 200ms;

			&::after {
				content: "AM";
				position: absolute;
				top: 50%;
				width: 22px;
				left: 10px;
				transform: translate(0, -50%);
				color: $white;
			}

			&::before {
				content: "PM";
				position: absolute;
				top: 50%;
				left: 5px;
				width: 22px;
				transform: translate(200%, -50%);
			}
		}

		&__input:checked + &__switch {
			background: $red;
			transform: translate(100%, 0);

			&::after {
				top: 50%;
				left: -100%;
				transform: translate(50%, -50%);
				color: $black;
			}

			&::before {
				color: $white;
				top: 50%;
				left: 0;
				right: 50%;
				transform: translate(50%, -50%);
			}
		}
	}
</style>