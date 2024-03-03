<script lang="ts" setup>
	/* eslint-disable */
	defineProps<{
		text?: string
		type?: string
		withIcon?: boolean
		isDisabled?: boolean
	}>()
</script>
<template>
	<button class="custom-button" :type="type ?? 'button'" :disabled="isDisabled">
		<span class="text">{{ text }}</span>
		<span class="icon" v-if="withIcon">
      <slot name="icon"></slot>
    </span>
	</button>
</template>
<style lang="scss" scoped>
	.custom-button {
		background: $red;
		padding: 13px 24px;
		border-radius: 8px;
		cursor: pointer;

		&:not([disabled]):hover {
			background: $red-hover;
		}

		&[disabled] {
			cursor: default;

			span {
				&.text {
					opacity: 0.5;
				}
			}
		}

		span {
			&.icon {
				margin-left: 10px;
			}

			&.text {

				@include font(button-mobile);
				color: $white;
			}
		}

		@include breakpoint(xs) {
			padding: 16px 32px;
			span {
				&.text {
					@include font(button);
				}
			}
		}
	}
</style>