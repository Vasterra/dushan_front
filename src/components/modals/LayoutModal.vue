<script lang="ts" setup>
	import TimesIcon from "@/components/icons/TimesIcon.vue"
	import { onClickOutside } from "@vueuse/core";
	import { ref } from "vue";

	/* eslint-disable */
	const props = defineProps<{
		isShow: boolean,
		isCloset?: boolean
		isSearchOrder?: boolean
	}>()

	const emit = defineEmits<(e: "close") => void>()
	const component = ref(null)

	const close = () => {
		emit("close")
	}

	onClickOutside(component, () => {
		close()
	})
</script>
<template>
	<transition name="modal-fade">
		<div class="modal-backdrop" :class="{ show: isShow }">
			<div class="modal rounder-12 bg-white flex justify-content-center align-items-center" :class="{isSearchOrder}"
					 ref="component">
				<TimesIcon class="close-icon close-icon__modal cursor-pointer" @click="close" v-if="isCloset"/>
				<slot name="body"></slot>
			</div>
		</div>
	</transition>
</template>
<style lang="scss" scoped>

	.modal-backdrop {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 10000;
		background-color: rgba(0, 0, 0, 0.3) !important;
		display: flex;
		justify-content: center;
		align-items: center;
		opacity: 1 !important;
		transform: scale(0, 0);

		&.show {
			transform: scale(1, 1);
		}

		.modal {
			position: relative;
			padding: 50px 32px;
			min-width: 300px;
			max-width: 700px;
			margin: 0 20px;

			@include breakpoint(md) {
				padding: 80px 72px;
				min-width: 450px;
				max-width: 700px;
				margin: 0;
			}

			.btn {
				width: 140px;
			}

			&.isSearchOrder {
				padding: 28px 44px;
				min-width: 354px;
				max-width: 354px;
				@include breakpoint(md) {
					padding: 48px 64px;
					min-width: 954px;
					max-width: 954px;
				}
			}
		}
	}

	.modal-fade-enter,
	.modal-fade-leave-to {
		opacity: 0 !important;
	}

	.modal-fade-enter-active,
	.modal-fade-leave-active {
		transition: opacity 0.5s ease !important;
	}
</style>