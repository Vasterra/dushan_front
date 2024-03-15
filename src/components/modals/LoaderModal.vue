<script lang="ts" setup>
	import LayoutModal from "@/components/modals/LayoutModal.vue"
	import { ref, onMounted } from "vue";
	import { useEventBus } from "@vueuse/core";

	const isShow = ref(false)
	const changeIsOpenLoaderModal = useEventBus("changeIsOpenLoaderModal")
	onMounted(() => {
		/* eslint-disable */
		// @ts-ignore
		changeIsOpenLoaderModal.on((data: boolean) => isShow.value = data)
	})
</script>
<template>
	<LayoutModal :is-show="isShow">
		<template v-slot:body>
			<div class="flex-col justify-content-center align-items-center">
				<div id="progressbar">
					<span id="loading"></span>
					<div id="load">LOADING..</div>
				</div>
			</div>
		</template>
	</LayoutModal>
</template>
<style lang="scss" scoped>
	#progressbar {
		height: 26px;
		position: absolute;
		left: 50%;
		top: 50%;
		width: 200px;
		background: black;
		border-radius: 30px;
		margin: -20px 0 0 -100px;
		padding: 2px;
	}

	#loading {
		transition: all 500ms ease;
		height: 20px;
		width: calc(100% - 10px);
		border-radius: 10px;
		background: white;
		position: absolute;
		margin: 3px;
		margin-top: 1px;
		display: inline-block;
		animation: load 5s ease infinite;
	}

	#load {
		font-family: 'Poppins', sans-serif;
		font-size: 2rem;
		text-align: center;
		margin-top: 30px;
		letter-spacing: 1px;
	}

	@keyframes load {
		0% {
			width: 2%;
		}
		10% {
			width: 10%;
		}
	}
</style>