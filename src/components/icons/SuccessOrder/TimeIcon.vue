<script lang="ts" setup>
	/* eslint-disable */
	const props = defineProps<{
		color?: string
		height?: string
		width?: string
	}>()
</script>
<template>
	<svg :width="width ?? 17" :height="height ?? 17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path
			d="M8.3999 4.23324V8.3999H5.8999M15.8999 8.3999C15.8999 12.542 12.542 15.8999 8.3999 15.8999C4.25777 15.8999 0.899902 12.542 0.899902 8.3999C0.899902 4.25777 4.25777 0.899902 8.3999 0.899902C12.542 0.899902 15.8999 4.25777 15.8999 8.3999Z"
			:stroke="color ?? '#8A8A8A'" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
	</svg>
</template>