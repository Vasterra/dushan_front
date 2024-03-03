<script lang="ts" setup>
	/* eslint-disable */
	import { computed } from "vue"

	type ArrowDirection = "up" | "left" | "right" | "down"
	const props = defineProps<{
		direction?: ArrowDirection
		color?: string
		height?: string
		width?: string
	}>()

	const angleValues = {
		down: 0,
		left: 90,
		up: 180,
		right: 270,
	}

	const rotationAngle = computed(() => angleValues[props.direction ?? "left"])
</script>
<template>
	<svg
		:width="width ?? 10"
		:height="height ?? 6"
		viewBox="0 0 10 6"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		:transform="`rotate(${rotationAngle} 0 0)`"
	>
		<path d="M1 1L5 5L9 1" :stroke="color ?? '#333333'" stroke-linecap="square" stroke-linejoin="round"/>
	</svg>
</template>
