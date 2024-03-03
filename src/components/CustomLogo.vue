<script lang="ts" setup>
	/* eslint-disable */
	import { computed, reactive, ref, watch } from "vue";

	const props = defineProps<{
		step: number
	}>()
</script>
<template>
	<div class="logo">
		<img src="~@/assets/images/logo-white.png" alt="logo.png" v-if="step !== 2">
		<img src="~@/assets/images/logo-black.png" alt="logo.png" v-else>
	</div>
</template>