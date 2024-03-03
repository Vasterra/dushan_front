<script lang="ts" setup>
	/* eslint-disable */
	import { computed } from "vue";

	const props = defineProps<{
		modelValue?: undefined
		value?: undefined
		type?: string
		autocomplete?: string
		isReadonly?: boolean
		isRequired?: boolean
		isDisabled?: boolean
		isError?: boolean
		isBorderTransparent?: boolean
		errorMessage?: string
		label: string
		name: string
		placeholder?: string
		id: string
		isTextarea?: boolean
	}>()

	const emit = defineEmits<(e: "update:modelValue", value: string) => void>()

	const value = computed({
		get: function () {
			return props.value ?? props.modelValue
		},
		set(value) {
			emit("update:modelValue", value ?? "")
		},
	})
</script>
<template>
	<div>
		<div class="custom-input">
			<input
				v-if="!isTextarea"
				type="text"
				:id="id"
				autocomplete="off"
				:name="name"
				:required="isRequired"
				:readonly="isReadonly"
				:disabled="isDisabled"
				:autocomplete="autocomplete"
				class="custom-input__input"
				:class="{ 'not-empty': value, isError, 'border-transparent': isBorderTransparent }"
				v-model.trim="value"
			/>
			<textarea
				v-else
				type="text"
				:id="id"
				autocomplete="off"
				:name="name"
				:required="isRequired"
				:readonly="isReadonly"
				:disabled="isDisabled"
				:autocomplete="autocomplete"
				class="custom-input__input textarea"
				:class="{ 'not-empty': value, isError }"
				v-model.trim="value"
			></textarea>

			<label :for="id" :title="label" :data-title="label" class="custom-input__label"></label>
		</div>

		<div class="error-message" v-if="isError">
			{{ errorMessage }}
		</div>
	</div>
</template>
<style lang="scss" scoped>
	.error-message {
		@include font(error-text);
		color: $red;
		margin-left: 16px;
		margin-top: 4px;
	}

	.custom-input {
		position: relative;

		&__label {
			@include font(input-label-mobile);
			color: $gray;

			@include breakpoint(xs) {
				@include font(input-label);
			}

			&::before {
				content: attr(title);
				position: absolute;
				top: 50%;
				left: 15px;
				@include font(input-label-mobile);
				@include breakpoint(xs) {
					@include font(input-label);
				}
				color: #777;
				transform: translate(0, -50%);
			}
		}

		&__input {

			background-color: $white;
			border-radius: 8px;
			border: 1px solid $gray-light;
			width: 100%;

			@include font(input-mobile);
			padding: 13px 12px 4px;
			height: 44px;
			@include breakpoint(xs) {
				padding: 24px 16px 4px;
				height: 54px;
				@include font(input);
			}

			&:-webkit-autofill,
			&:-webkit-autofill:hover,
			&:-webkit-autofill:focus,
			&:-webkit-autofill:active {
				-webkit-background-clip: text;
				-webkit-text-fill-color: $black;
				transition: background-color 50000s ease-in-out 0s;
			}


			&.border-transparent {
				border-color: transparent;
			}

			&.isError {
				border: 1px solid $red;
			}

			&:not(.border-transparent):focus {
				border: 1px solid $gray-active;
			}

			&:focus + label::before,
			&.not-empty + label::before {
				top: 0;
				background: $white;
				padding: 0 6px;
				left: 9px;
				transform: translate(0, 50%);
				@include font(input-label-fill-mobile);
				@include breakpoint(xs) {
					@include font(input-label-fill);
				}
			}

			&.textarea {
				height: 105px;
				overflow-y: scroll;
				resize: none;

				padding-top: 24px;

				@include breakpoint(xs) {
					padding-top: 24px;
					height: 120px;
				}

				+ .custom-input__label {
					&::before {
						content: attr(title);
						position: absolute;
						top: 20%;
						left: 15px;
						@include font(input-label-mobile);
						@include breakpoint(xs) {
							@include font(input-label);
						}
						color: #777;
						transform: translate(0, -50%);
					}
				}

				&:focus + label::before,
				&.not-empty + label::before {
					top: 0;
					background: $white;
					padding: 0 6px;
					left: 9px;
					transform: translate(0, 50%);
					@include font(input-label-fill-mobile);
					@include breakpoint(xs) {
						@include font(input-label-fill);
					}
				}
			}
		}
	}
</style>