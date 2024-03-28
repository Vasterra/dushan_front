<script lang="ts" setup>
	import PlusIcon from "@/components/icons/PlusIcon.vue"
	import MinusIcon from "@/components/icons/MinusIcon.vue"
	import { computed, ref } from "vue";
	import { AdditionalStopType } from "../../types";
	/* eslint-disable */
	const props = defineProps<{
		item: AdditionalStopType,
		countPassengers: number
	}>()

	const isAdded = ref(false);

	const emit = defineEmits(['add', 'remove'])

	const added = () => {
		isAdded.value = !isAdded.value
		emit(isAdded.value ? 'add' : 'remove', props.item)
	}

	const srcImage = computed(() => {
		return `https://api.theluxurytransfers.com/${props.item.photo}`
	})

	const colorIcon = computed(() => {
		return isAdded.value ? '#C4161C' : '#FFFFFF'
	})
</script>
<template>
	<div class="additional-stop">
		<div class="additional-stop__btn change-btn" :class="{ isAdded }" @click.stop.prevent="added">
			<PlusIcon class="change-btn__icon" color="white" width="12" height="12" v-if="!isAdded"/>
			<MinusIcon class="change-btn__icon" width="12" height="2" v-else/>
			<span class="change-btn__text">{{
					isAdded ? 'Added' : `Add for €${countPassengers === 8 ? item.price_for_8_pax : item.price}`
				}}</span>
		</div>
		<div class="additional-stop__img">
			<img
				:src="srcImage"
				alt="bg-image.png">
		</div>
		<div class="additional-stop__name">{{ item.name }}</div>
	</div>
</template>
<style lang="scss" scoped>
	.additional-stop {
		position: relative;

		&__name {
			position: absolute;
			left: 16px;
			bottom: 16px;
			@include font(additional-stop-name-mobile);
			@include breakpoint(xs) {
				@include font(additional-stop-name);
			}
			color: $white;
		}

		&__img {
			max-width: 100%;
			border-radius: 8px;
			height: 250px;
			@include breakpoint(xs) {
				max-width: 540px;
			}

			img {
				width: 100%;
				height: 100%;
				object-fit: cover;
				border-radius: 8px;
			}
		}

		&__btn {
			position: absolute;
			left: 16px;
			top: 16px;
			display: flex;
			align-items: center;
		}

		.change-btn {
			background-color: $white;
			border-radius: 100px;
			padding: 4px 8px 4px 4px;
			cursor: pointer;

			&__icon {
				background-color: $red;
				border-radius: 50%;
				padding: 7px;
				width: 24px;
				height: 24px;
				@include breakpoint(xs) {
					width: 28px;
					height: 28px;
				}
			}

			&__text {
				margin-left: 8px;
				@include font(input-label-mobile);
				@include breakpoint(xs) {
					@include font(input-label);
				}
				color: $black;
			}

			&.isAdded {
				background-color: $red;

				.change-btn {
					&__icon {
						background-color: $white;
					}

					&__text {
						color: $white;
					}
				}
			}
		}
	}
</style>