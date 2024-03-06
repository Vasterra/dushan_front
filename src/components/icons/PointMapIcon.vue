<script lang="ts" setup>
	/* eslint-disable */
	defineProps<{
		width?: number | string
		height?: number | string
		color?: string
	}>()
</script>
<template>
	<svg width="24" height="30" viewBox="0 0 24 30" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path
			d="M12 28.5C14.75 23 23 19.4501 23 12C23 5.92487 18.0751 1 12 1C5.92487 1 1 5.92487 1 12C1 19.4501 9.25 23 12 28.5Z"
			:fill="color ?? '#C4161C'"/>
		<path
			d="M12 12H12.0183M23 12C23 19.4501 14.75 23 12 28.5C9.25 23 1 19.4501 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12Z"
			:stroke="color ?? '#C4161C'" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
		<path
			d="M12.0001 15.3C14.4302 15.3 16.4001 13.3301 16.4001 10.9C16.4001 8.46995 14.4302 6.5 12.0001 6.5C9.57005 6.5 7.6001 8.46995 7.6001 10.9C7.6001 13.3301 9.57005 15.3 12.0001 15.3Z"
			fill="white" stroke="white" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
	</svg>
</template>