<script lang="ts" setup>
	import { onMounted, reactive, ref, watch } from "vue";
	import { GoogleMap } from 'vue3-google-map'
	import { Loader } from '@googlemaps/js-api-loader';

	interface CoordsItem {
		location: {
			lat: number,
			lng: number
		},
		stopover: boolean
	}

	/* eslint-disable */
	const props = defineProps<{
		origin: CoordsItem
		destination: CoordsItem
		waypoints: CoordsItem[]
	}>()

	const center = reactive({lat: 51.093048, lng: 6.84212})
	const loader = new Loader({
		apiKey: 'AIzaSyCvh_BJm6nyE1cOFSlJ00Vhj0HNU1UQOzQ',
		language: 'en'
	});

	const apiPromise = loader.load();
	const mapRef = ref();
	const travelMode = ref()
	const directionsService = ref()
	const directionsRenderer = ref()

	const paintMap = () => {
		if (props.destination.location.lat !== 0 && props.origin.location.lat !== 0) {
			travelMode.value = mapRef.value.api.TravelMode.DRIVING;
			directionsService.value = new mapRef.value.api.DirectionsService();
			directionsRenderer.value = new mapRef.value.api.DirectionsRenderer();

			directionsRenderer.value.setMap(mapRef.value.map);
			directionsService.value.route({
				origin: props.origin,
				destination: props.destination,
				waypoints: props.waypoints,
				optimizeWaypoints: true,
				travelMode: travelMode.value,
			}).then((result) => {
				directionsRenderer.value.setDirections(result);
			})
				.catch((e) => {
					window.alert("Directions request failed due to " + e);
				});
		}
	}

	watch(() => props.origin, async () => {
		directionsRenderer.value.setMap(null)
		paintMap()
	});

	watch(() => props.destination, async () => {
		directionsRenderer.value.setMap(null)
		paintMap()
	});

	watch(() => props.waypoints, async () => {
		directionsRenderer.value.setMap(null)
		paintMap()
	});

	onMounted(() => {
		apiPromise.then(() => {
			paintMap()
		})
	})
</script>
<template>
	<GoogleMap
		ref="mapRef"
		:api-promise="apiPromise"
		:center="center"
		style="width: 100%; height: 600px"
		:zoom="15">
	</GoogleMap>
</template>