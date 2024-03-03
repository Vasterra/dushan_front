<script lang="ts" setup>
	/* eslint-disable */
	import ArrowIcon from "@/components/icons/ArrowIcon.vue"
	import CheckIcon from "@/components/icons/CheckIcon.vue"
	import { ref } from "vue";
	import { onClickOutside } from "@vueuse/core"
	import { DropdownItem } from "../../../types";

	const props = defineProps<{
		autocomplete?: string
		isError?: boolean
		errorMessage?: string
		label: string
		name: string
		id: string
		isBorderTransparent?: boolean,
		items: DropdownItem[]
	}>()

	const component = ref(null)
	const isOpen = ref(false)
	const selected = ref(null)

	const emit = defineEmits(['changeOpen', 'select'])

	const open = () => {
		isOpen.value = !isOpen.value
		emit('changeOpen', isOpen.value)
	}

	onClickOutside(component, event => {
		isOpen.value = false
		emit('changeOpen', isOpen.value)
	})

	const selectItem = (item: DropdownItem) => {
		selected.value = item;
		isOpen.value = false
		emit('select', item)
	}
</script>
<template>
	<div>
		<div class="custom-dropdown" @click="open" :class="{isOpen, isError, isBorderTransparent}" ref="component">
			<div class="custom-dropdown__title" :class="{selected}">
				{{ label }}
			</div>
			<div class="custom-dropdown__selected" v-if="selected">{{ selected.name }}</div>
			<div class="custom-dropdown__arrow">
				<ArrowIcon :direction="isOpen ? 'up' : 'down'" width="16" height="16"/>
			</div>
			<ul class="custom-dropdown__items">
				<template v-for="item in items" :key="item.id">
					<li class="custom-dropdown__item" @click.prevent.stop="selectItem(item)">
						<div class="item__name">{{ item.name }}</div>
						<CheckIcon v-if="selected?.id === item.id"/>
					</li>
				</template>
			</ul>
		</div>
		<div class="custom-dropdown__error" v-if="isError">
			{{ errorMessage }}
		</div>
	</div>
</template>
<style lang="scss" scoped>
	.custom-dropdown {
		position: relative;
		cursor: pointer;
		width: 100%;
		height: 54px;
		background-color: $white;
		border: 1px solid $gray-light;
		border-radius: 8px;
		//z-index: 10;


		&__error {
			@include font(error-text);
			color: $red;
			margin-left: 16px;
			margin-top: 4px;
		}

		&.isOpen {
			border: 1px solid $gray-active;

			.custom-dropdown__items {
				transform: scaleY(1);

				&::before {
					content: "";
					position: absolute;
					width: calc(100% + 2px);
					z-index: 1;
					top: -1px;
					box-shadow: none;
					left: -1px;
					height: 5px;
					background-color: $white;
					border: 1px solid $gray-active;
					border-top: 0;
					border-radius: 0 0 8px 8px;
				}
			}
		}

		&.isError {
			border: 1px solid $red;
		}

		&__selected {
			position: absolute;
			bottom: 8px;
			left: 16px;
		}

		&__arrow {
			position: absolute;
			right: 20px;
			top: 60%;
			transform: translate(0, -50%);
		}

		&__title {
			position: absolute;
			top: 50%;
			left: 15px;
			@include font(input-label-mobile);
			@include breakpoint(xs) {
				@include font(input-label);
			}
			color: #777;
			transform: translate(0, -50%);

			&.selected {
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

		&__items {
			position: absolute;
			list-style: none;
			left: -1px;
			top: 45px;
			background-color: $white;
			width: calc(100% + 2px);
			border-radius: 8px;
			box-shadow: 0 10px 12px 0 rgba(0, 0, 0, 0.0784313725);
			transform: scaleY(0);
			transform-origin: top;
			z-index: 10;
			border: 1px solid $gray-active;
		}

		&.isBorderTransparent {
			border: none;
			//height: 42px;
			//@include breakpoint(xs) {
			//	height: 52px;
			//}

			&.isOpen {
				border: none;
			}

			.custom-dropdown__items {
				//border-top: none;
				top: 54px;
				@include breakpoint(xs) {
					top: 54px
				}

				&::before {
					content: none;
				}

				border-radius: 0 0 8px 8px;

				.custom-dropdown__item {
					&:first-of-type {
						border-radius: 0 0 8px 8px;
					}
				}
			}
		}

		&__item {
			padding: 10px;
			@include font(input-mobile);
			@include breakpoint(xs) {
				padding: 15px 13px;
				@include font(input);
			}

			&:first-of-type {
				border-radius: 0;
			}

			background-color: $white;
			display: flex;
			align-items: center;
			justify-content: space-between;
			cursor: pointer;

			img {
				width: 28px;
				height: 20px;
				margin-right: 8px;
			}

			&:first-of-type {
				border-radius: 0;
			}

			&:last-of-type {
				border-radius: 0 0 8px 8px;
			}
		}
	}
</style>