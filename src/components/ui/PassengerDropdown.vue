<script lang="ts" setup>
	/* eslint-disable */
	import ArrowIcon from "@/components/icons/ArrowIcon.vue"
	import CountButton from "@/components/ui/CountButton.vue"
	import { computed, ref } from "vue";
	import { onClickOutside } from "@vueuse/core"

	const props = defineProps<{
		autocomplete?: string
		isError?: boolean
		errorMessage?: string
	}>()

	const component = ref(null)
	const isOpen = ref(false)
	const selected = ref(true)

	const emit = defineEmits<(e: "update", value: any) => void>()

	const items = ref([
		{id: 1, name: "Adults", count: 1},
		{id: 2, name: "Children", count: 0},
	])

	const open = () => {
		isOpen.value = !isOpen.value
	}

	const text = computed(() => {
		return `${items.value[0].count} adults, ${items.value[1].count} children`;
	})

	onClickOutside(component, event => {
		isOpen.value = false
	})

	const isDisabled = (item: any, isPlus: boolean) => {
		const allCount = items.value.reduce((tot, arr) => tot + arr.count, 0);

		if (item.count === 0 && !isPlus) {
			return true
		}

		return allCount >= 8 && isPlus;
	}

	const result = computed(() => {
		return {
			adults: items.value[0].count,
			children: items.value[1].count,
		}
	})

	const clickHandler = (item, isPlus) => {
		isPlus ? item.count++ : item.count--
		emit('update', result.value)
	}
</script>
<template>
	<div>
		<div class="custom-dropdown" @click="open" :class="{isOpen, isError}" ref="component">
			<div class="custom-dropdown__title" :class="{selected}">Number of the passengers*</div>
			<div class="custom-dropdown__selected">{{ text }}</div>
			<div class="custom-dropdown__arrow">
				<ArrowIcon :direction="isOpen ? 'up' : 'down'" width="16" height="16"/>
			</div>
			<ul class="custom-dropdown__items">
				<template v-for="item in items" :key="item.id">
					<li class="custom-dropdown__item">
						<div class="item__name">{{ item.name }}</div>
						<div class="item__count">
							<CountButton :is-disabled="isDisabled(item, false)" :is-plus="false"
													 @click.prevent.stop="clickHandler(item,false)"/>
							<p class="item__count--count">{{ item.count }}</p>
							<CountButton :is-disabled="isDisabled(item, true)" :is-plus="true"
													 @click.prevent.stop="clickHandler(item,true)"/>
						</div>
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
			@include font(input-mobile);
			@include breakpoint(xs) {
				@include font(input);
			}
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

		&__item {
			padding: 10px;
			@include font(input-label-mobile);
			@include breakpoint(xs) {
				padding: 15px 13px;
				@include font(input-label);
			}
			background-color: $white;
			display: flex;
			align-items: center;
			justify-content: space-between;

			&:first-of-type {
				border-radius: 0;
			}

			&:last-of-type {
				border-radius: 0 0 8px 8px;
			}
		}

		.item__count {
			max-width: 80px;
			display: flex;
			gap: 10px;
			align-items: center;
			justify-content: space-between;

			&--count {
				width: 10px;
				cursor: default;
				text-align: center;
			}
		}
	}
</style>