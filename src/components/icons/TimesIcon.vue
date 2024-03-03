<script lang="ts" setup>
	/* eslint-disable */
	const props = defineProps<{
		color?: string
		height?: string
		width?: string
	}>()
</script>
<template>
	<svg :width="width ?? 16" :height="height ?? 16" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M12.6569 12.6566L1.34315 1.34291M1.34315 12.6566L12.6569 1.34291"
					:stroke="color ?? '#030000'"
					stroke-width="1.3"
					stroke-linecap="round" stroke-linejoin="round"/>
	</svg>
</template>