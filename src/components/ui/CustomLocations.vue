<script lang="ts" setup>
	import CustomDropdown from "@/components/ui/CustomDropdown"
	import { ref } from "vue";

	const isOpenPickup = ref(false);
	const isOpenDropOff = ref(false);

	const openPickup = (value: boolean) => {
		isOpenPickup.value = value;
		isOpenDropOff.value = false;
	}
	const openDropOff = (value: boolean) => {
		isOpenDropOff.value = value;
		isOpenPickup.value = false;
	}
</script>
<template>
	<div class="location-dropdown" :class="{ isOpen: isOpenPickup || isOpenDropOff , isOpenPickup, isOpenDropOff }">
		<CustomDropdown class="location-dropdown__item" @changeOpen="openPickup"
										:is-border-transparent="true"
										label="Pick-up Locations* "
										id="pick_up" name="pick_up"/>
		<div class="location-dropdown__separator"></div>
		<CustomDropdown class="location-dropdown__item" @changeOpen="openDropOff"
										:is-border-transparent="true"
										label="Drop-off Locations *"
										id="drop_off" name="drop_off"/>
	</div>
</template>
<style lang="scss" scoped>
	.location-dropdown {
		width: 100%;
		background-color: $white;
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-direction: column;
		border: 1px solid $gray-light;
		border-radius: 8px;
		@include breakpoint(xs) {
			flex-direction: row;
		}

		&.isOpenPickup {
			border-radius: 8px 8px 8px 0;
			@include breakpoint(xs) {
				border-radius: 8px 8px 8px 0;
			}

		}

		&.isOpenDropOff {
			border-radius: 8px 8px 0 0;
			@include breakpoint(xs) {
				border-radius: 8px 8px 0 8px;
			}
		}

		&.isOpen {
			border: 1px solid $gray;
		}

		&__separator {
			width: 100%;
			height: 1px;
			margin: 4px 0;
			background-color: $gray-light;

			@include breakpoint(xs) {
				width: 1px;
				height: 24px;
			}
		}

		&__item {
			width: 100%;
			//height: 42px;
			@include breakpoint(xs) {
				//height: 52px;
			}
		}
	}
</style>
