<script lang="ts" setup>
	import CustomCalendar from "@/components/ui/CustomCalendar"
	import DepartureTime from "@/components/ui/DepartureTime"
	import { ref } from "vue";
	import { onClickOutside } from "@vueuse/core"

	const isActive = ref(false)
	const isOpenCalendar = ref(false)
	const isOpenTime = ref(false)
	const component = ref(null)

	/* eslint-disable */
	const changeOpen = (value: boolean) => {
		isOpenCalendar.value = value
		changeIsActive()
	}

	const emit = defineEmits(['updateDate', 'updateTime', 'updateSwitchTime'])

	const openTime = () => {
		isOpenTime.value = isOpenTime.value ? isOpenTime.value : true
		changeIsActive()
	}

	const changeIsActive = () => {
		isActive.value = isOpenTime.value || isOpenCalendar.value;
	}

	const updateDate = (date: string) => {
		emit('updateDate', date);
	}

	const updateTime = (time: string) => {
		emit('updateTime', time);
	}

	const updateSwitchTime = (value: boolean) => {
		emit('updateSwitchTime', value);
	}

	onClickOutside(component, () => {
		isActive.value = false
	})
</script>
<template>
	<div class="date-time" :class="{ isActive }" ref="component">
		<CustomCalendar class="date-time__item" @changeOpen="changeOpen" @updateDate="updateDate"/>
		<div class="date-time__separator"></div>
		<DepartureTime class="date-time__item" @click="openTime" @updateTime="updateTime"
									 @updateSwitchTime="updateSwitchTime"/>
	</div>
</template>
<style lang="scss" scoped>
	.date-time {
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: $white;
		border: 1px solid $gray-light;
		border-radius: 8px;
		flex-direction: column;

		&__separator {
			width: 100%;
			height: 1px;
			margin: 4px 0;
			background-color: $gray-light;
		}

		&__item {
			width: 100%;
		}

		&.isActive {
			border: 1px solid $gray;
		}

		@include breakpoint(xs) {
			flex-direction: row;
			&__separator {
				width: 1px;
				height: 24px;
			}
		}


	}

</style>