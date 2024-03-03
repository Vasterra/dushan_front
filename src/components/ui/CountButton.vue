<script lang="ts" setup>
	/* eslint-disable */
	import PlusIcon from "@/components/icons/PlusIcon.vue"
	import MinusIcon from "@/components/icons/MinusIcon.vue"

	const props = defineProps<{
		isDisabled: boolean
		isPlus: boolean
	}>()
</script>
<template>
	<button type="button" :disabled="isDisabled">
		<PlusIcon color="white" v-if="isPlus"/>
		<MinusIcon color="white" v-else/>
	</button>
</template>
<style lang="scss" scoped>
	button {
		padding: 6px;
		width: 24px;
		height: 24px;
		border-radius: 50%;
		background-color: $red;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;

		&[disabled] {
			background-color: $gray-light;
			cursor: default;
		}
	}
</style>