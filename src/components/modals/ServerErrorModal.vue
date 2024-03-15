<script lang="ts" setup>
	import LayoutModal from "@/components/modals/LayoutModal.vue"
	import { ref, onMounted } from "vue";
	import { useEventBus } from "@vueuse/core";

	const isShow = ref(false)
	const message = ref();
	const changeIsOpenServerErrorModal = useEventBus("changeIsOpenServerErrorModal")
	onMounted(() => {
		changeIsOpenServerErrorModal.on((data) => {
			isShow.value = true
			message.value = data
		})
	})
</script>
<template>
	<LayoutModal :is-show="isShow" :is-closet="true" @close="isShow = false">
		<template v-slot:body>
			<div class="flex-col justify-content-center align-items-center">
				<p class="mt-24" v-html="message"></p>
			</div>
		</template>
	</LayoutModal>
</template>