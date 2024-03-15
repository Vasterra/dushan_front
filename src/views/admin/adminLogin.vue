<script lang="ts" setup>
	import { useEventBus } from "@vueuse/core";
	import { onMounted } from "vue";

	const changeBgColor = useEventBus('changeBgColor')
	onMounted(() => {
		changeBgColor.emit('white');
	})
</script>
<template>
	login

</template>