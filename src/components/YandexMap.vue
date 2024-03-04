<script lang="ts" setup>
	import type { YMap } from '@yandex/ymaps3-types';
	import {
		YandexMap,
		YandexMapMarker,
		YandexMapDefaultSchemeLayer,
		YandexMapDefaultFeaturesLayer,
		YandexMapListener, VueYandexMaps
	} from 'vue-yandex-maps';
	import { YMapMarkerProps } from '@yandex/ymaps3-types/imperative/YMapMarker';
	import { computed, reactive, shallowRef, watch } from "vue";

	const map = shallowRef<null | YMap>(null);

	const settings = reactive({
		location: {
			center: [37.617644, 55.755819],
			zoom: 9,
		},
		version: "2.1",
		lang: 'en',
		enterprise: false,
		debug: false,
	})

	const handleClick = (event: MouseEvent) => console.log(event);

	const markers: YMapMarkerProps[] = [
		{
			coordinates: [37.617644, 55.755819],
			onClick: handleClick,
		},
		{
			coordinates: [37.617644, 55.755819],
			onClick: handleClick,
		},
	];

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
	>
		<yandex-map-default-scheme-layer/>
		<yandex-map-default-features-layer/>
		<yandex-map-listener/>
		<yandex-map-marker
			v-for="(marker, index) in markers"
			:key="index"
			:settings="marker"
		>
			<div class="marker"/>
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

	.marker {
		position: relative;
		width: 20px;
		height: 20px;
		background: #ff0000;
		border-radius: 50%;
		border: 2px solid #fff;
		box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
		text-align: center;
		color: #fff;
		font-weight: bold;
		line-height: 20px;
	}
</style>