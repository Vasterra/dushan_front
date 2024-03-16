<script lang="ts" setup>
	/* eslint-disable */
	defineProps<{
		data: Record<string, string>
	}>()
</script>
<template>
	<div class="ellipsis-2 gap-10 fz-14">
		{{ data.travel.drop_off_location.name }}
	</div>
</template>
