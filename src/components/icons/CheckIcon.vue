<script lang="ts" setup>
	/* eslint-disable */
	const props = defineProps<{
		color?: string
		height?: string
		width?: string
	}>()
</script>
<template>
	<svg :width="width ?? 14" :height="height ?? 12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M1 6.5L4.69231 10.5L13 1.5" :stroke="color ?? '#030000'" stroke-width="1.5" stroke-linecap="round"
					stroke-linejoin="round"/>
	</svg>
</template>