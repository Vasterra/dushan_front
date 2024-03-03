<script lang="ts" setup>
	/* eslint-disable */
	defineProps<{
		width?: number | string
		height?: number | string
		color?: string
	}>()
</script>
<template>
	<svg :width="width ?? 14" :height="height ?? 2" viewBox="0 0 14 2" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M1 0.888916H7H13" :stroke="color ?? '#C4161C'" stroke-width="1.5" stroke-linecap="round"
					stroke-linejoin="round"/>
	</svg>
</template>
