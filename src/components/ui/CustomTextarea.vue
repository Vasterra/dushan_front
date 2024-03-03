<script lang="ts" setup>
	/* eslint-disable */
	import { computed } from "vue";

	const props = defineProps<{
		modelValue?: undefined
		label: string
		name: string
		placeholder?: string
		id: string
	}>()

	const emit = defineEmits<(e: "update:modelValue", value: string) => void>()

	const value = computed({
		get: function () {
			return props.modelValue
		},
		set(value) {
			emit("update:modelValue", value ?? "")
		},
	})
</script>
<template>
	<textarea class="custom-textarea"
						:id="id"
						autocomplete="off"
						:name="name"
						v-model.trim="value"></textarea>
</template>
<style lang="scss" scoped>
	.custom-textarea {
		background-color: $white;
		border: 1px solid $gray-light;
		padding: 24px 16px 4px;
		border-radius: 8px;
		width: 100%;
		height: 120px;
		overflow-y: scroll;
	}
</style>