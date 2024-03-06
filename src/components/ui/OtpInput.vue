<script lang="ts" setup>
	/* eslint-disable */
	import { ref, reactive } from 'vue';

	const props = defineProps({
		default: String,

		digitCount: {
			type: Number,
			required: true
		}
	});

	const digits = reactive([1, 2, 0, 0])

	if (props.default && props.default.length === props.digitCount) {
		for (let i = 0; i < props.digitCount; i++) {
			digits[i] = props.default.charAt(i)
		}
	} else {
		for (let i = 0; i < props.digitCount; i++) {
			digits[i] = null;
		}
	}

	const otpCont = ref(null)

	const placeholders = reactive({
		0: "0",
		1: "8",
		2: "0",
		3: "0",
	})

	const emit = defineEmits(['update:otp']);

	const isDigitsFull = function () {
		for (const elem of digits) {
			if (elem == null || elem == undefined) {
				return false;
			}
		}

		return true;
	}

	const handleKeyDown = function (event, index) {
		if (event.key !== "Tab" &&
			event.key !== "ArrowRight" &&
			event.key !== "ArrowLeft"
		) {
			event.preventDefault();
		}

		if (event.key === "Backspace") {
			digits[index] = null;

			if (index != 0) {
				(otpCont.value.children)[index - 1].focus();
			}

			return;
		}

		if ((new RegExp('^([0-9])$')).test(event.key)) {
			digits[index] = event.key;

			console.log(index)
			console.log(digits[1])

			if ((index == 0 || index == 4) && event.key > 1) {
				digits[index] = 1
			}

			if (index == 1 && event.key > 2 && digits[0] == 1) {
				digits[index] = 2
			}

			if (index == 2 && event.key > 5) {
				digits[index] = 5
			}

			if (index == 0 && event.key == 1 && digits[1] >= 2) {
				console.log(32)
				digits[1] = 2
			}
		} else {
			digits[index] = placeholders[index];
		}


		if (index != props.digitCount - 1) {
			(otpCont.value.children)[index + 1].focus();
		}

		if (isDigitsFull()) {
			if (digits.join('') == "1259") {
				digits[0] = 1;
				digits[1] = 1;
				digits[2] = 5;
				digits[3] = 9;
			}
			emit('update:otp', digits.join(''))
		}
	}

</script>

<template>
	<div ref="otpCont">
		<template v-for="(el, ind) in digits" :key="el+ind">
			<input
				type="text"
				class="digit-box"
				v-model="digits[ind]"
				:placeholder="placeholders[ind]"
				maxlength="1"
				@keydown="handleKeyDown($event, ind)"
				:class="{bounce: digits[ind] !== null}"
			>
		</template>
	</div>

</template>

<style lang="scss" scoped>
	.digit-box {
		width: 11px;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 2px;
		color: $black !important;
		@include font(input-mobile);
		@include breakpoint(xs) {
			@include font(input);
		}

		::placeholder {
			color: $gray !important;
			opacity: 1; /* Firefox */
		}

		::-ms-input-placeholder { /* Edge 12 -18 */
			color: $gray !important;
		}

		&:nth-child(2) {
			margin-right: 10px;
		}
	}
</style>