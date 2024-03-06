<script lang="ts" setup>
	import type { YMap } from '@yandex/ymaps3-types';
	import {
		YandexMap,
		YandexMapMarker,
		YandexMapDefaultSchemeLayer,
		YandexMapDefaultFeaturesLayer,
		YandexMapListener, VueYandexMaps
	} from 'vue-yandex-maps';
	// import { YMapMarkerProps } from '@yandex/ymaps3-types/imperative/YMapMarker';
	import { computed, reactive, shallowRef, watch } from "vue";
	import PointMapIcon from "@/components/icons/PointMapIcon"

	const map = shallowRef<null | YMap>(null);

	/* eslint-disable */
	const props = defineProps<{
		coordsItems: number[]
	}>()

	const settings = reactive({
		location: {
			center: [16.3725042, 48.2083537],
			zoom: 7,
		},
		version: "2.1",
		enterprise: false,
		debug: false,
	})

	const handleClick = (event: MouseEvent) => console.log(event);


	const randomColorMarker = () => {
		return Math.floor(Math.random() * 16777215).toString(16);
	}
	const componentToHex = (c: string) => {
		var hex = c.toString(16);
		return hex.length == 1 ? "0" + hex : hex;
	}
	const rgbToHex = (r: string, g: string, b: string) => {
		return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
	}

	// const randomColorMarker = () => {
	// 	let r, g, b;
	// 	r = Math.floor(Math.random() * 256);
	// 	g = Math.floor(Math.random() * 256);
	// 	b = Math.floor(Math.random() * 256);
	// 	return rgbToHex(r.toString(), g.toString(), b.toString());
	// }

	const markers = computed(() => {
		return props.coordsItems.map(function (coords) {
			return {
				color: `#${randomColorMarker()}`,
				coordinates: coords,
				onClick: handleClick,
			}
		})
	})

	const mapWasInitializedHandler = (map) => {
		console.log(map)
	}

	const isLoaded = computed(() => VueYandexMaps.isLoaded.value);


	const myMap = async () => {
		// const ymaps3Vue = await ymaps3.import('@yandex/ymaps3-vuefy');
		// console.log(ymaps3.import)
		// const multiRoute = ymaps3.route({
		// 	points: [
		// 		[55.74062, 37.62561]
		// 	],
		// 	type: "driving"
		// })
		// var multiRoute = new VueYandexMaps.ymaps.multiRouter.MultiRoute({
		// 	referencePoints: ['Москва, Ленинский проспект", "Москва, Кулаков переулок'],
		// }, {
		// 	editorDrawOver: false,
		// 	wayPointDraggable: true,
		// 	viaPointDraggable: true,
		// 	// Зададим собственное оформление линий мультимаршрута.
		// 	routeStrokeColor: "000088",
		// 	routeActiveStrokeColor: "ff0000",
		// 	pinIconFillColor: "ff0000",
		// 	boundsAutoApply: true,
		// 	zoomMargin: 30
		// });

		// myMap.geoObjects.add(multiRoute);
		// const myRouter = VueYandexMaps.ymaps().route([
		// 	// Список точек, которые необходимо
		// 	// посетить
		// 	'Москва, метро Арбатская', {
		// 		// Транзитная точка
		// 		type: "viaPoint",
		// 		point: "Москва, метро Кропоткинская"
		// 	},
		// 	// метро "Третьяковская"
		// 	[55.74062, 37.62561]
		// ], {
		// 	/* Опции маршрутизатора:
		// 		 - автоматически позиционировать карту */
		// 	// mapStateAutoApply: true,
		// });

		// myRouter.then(function (route) {
		// 	console.log(route)
		// 	// Добавление маршрута на карту
		// 	VueYandexMaps.ymaps().geoObjects.add(route);
		// });
		// console.log(myRouter)
	}
	watch(VueYandexMaps.isLoaded, () => {
		myMap()
	});

</script>
<template>
	<yandex-map
		v-model="map"
		class="ymap-class"
		@initializeOn="mapWasInitializedHandler"
		:settings="settings"
		:scroll-zoom="false"
		:use-object-manager="true"
		:show-all-markers="true"
	>
		<yandex-map-default-scheme-layer/>
		<yandex-map-default-features-layer/>
		<yandex-map-listener/>
		<yandex-map-marker
			v-for="(marker, index) in markers"
			:marker-id="index"
			:key="index"
			:settings="marker"
		>
			<PointMapIcon class="marker" :color="marker.color"/>
		</yandex-map-marker>
	</yandex-map>
</template>
<style lang="scss">
	.ymaps3x0--main-engine-container {
		filter: grayscale(1);
		-ms-filter: grayscale(1);
		-webkit-filter: grayscale(1);
		-moz-filter: grayscale(1);
		-o-filter: grayscale(1);
	}

	.ymap-class, .ymaps3x0--map {
		width: 100% !important;
		height: 280px !important;
		@include breakpoint(xs) {
			height: 460px !important;
			width: 100% !important;
		}
	}

	.ymaps3x0--map-copyrights_right {
		display: none !important;
	}
</style>