<script lang="ts" setup>
	import { reactive } from "vue";

	const center = reactive({lat: 51.093048, lng: 6.842120})
	const markers = reactive([
		// {
		// 	position: {
		// 		lat: 51.093048,
		// 		lng: 6.84212,
		// 	},
		// },
		// {
		// 	position: {
		// 		lat: 51.198429,
		// 		lng: 6.69529,
		// 	},
		// },
		// {
		// 	position: {
		// 		lat: 51.165218,
		// 		lng: 7.067116,
		// 	},
		// },
		// {
		// 	position: {
		// 		lat: 51.09256,
		// 		lng: 6.84074,
		// 	},
		// },
	])
</script>
<template>
	<GMapMap
		:center="center"
		:zoom="10"
		:max-zoom="18"
		:zoom-control="false"
		map-type-id="terrain"
		style="width: 100vw; height: 20rem"
	>
	
	</GMapMap>
</template>