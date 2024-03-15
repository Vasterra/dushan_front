<script lang="ts" setup>
	import { useEventBus } from "@vueuse/core";
	import { onMounted, ref, watch } from "vue";
	import ServerErrorModal from "@/components/modals/ServerErrorModal.vue"
	import LoaderModal from "@/components/modals/LoaderModal.vue"

	const changeBgColor = useEventBus('changeBgColor')

	const isWhite = ref(false)

	watch(() => isWhite.value, () => {
		if (isWhite.value) {
			document.getElementsByTagName('body')[0].classList.add('white')
			document.getElementsByTagName('body')[0].classList.remove('black')
		} else {
			document.getElementsByTagName('body')[0].classList.remove('white')
			document.getElementsByTagName('body')[0].classList.add('black')
		}
	})

	onMounted(() => {
		changeBgColor.on(data => {
			isWhite.value = data === 'white'
		})
	})
</script>
<template>
	<ServerErrorModal/>
	<LoaderModal/>
	<router-view/>
</template>

<style lang="scss">
	*,
	*:before,
	*:after {
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
		margin: 0;
		padding: 0;
		transition: all 0.2s ease;
		outline: none;
		border: none
	}

	* {
		@include font(main);
		list-style: none;
	}

	body {
		background-color: #0e0d0f;

		&.white {
			background-color: $gray-bg;
		}

		&.black {
			background-color: #0e0d0f;
		}
	}

	.wrapper {
		max-width: 1230px;
		position: relative;
		margin: 0 auto;
		padding: 16px;
	}

	.w-100 {
		width: 100%;
	}
</style>
