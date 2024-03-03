<script lang="ts" setup>

</script>

<template>
	<div class="card">
		<div class="card__title">
			<slot name="name"></slot>
		</div>
		<div class="card__body">
			<slot name="body"></slot>
		</div>
	</div>
</template>
<style lang="scss" scoped>
	.card {
		padding: 8px;
		background-color: $white;
		border-radius: 12px;
		@include breakpoint(xs) {
			padding: 32px;
		}

		&__title {
			@include font(card-title-mobile);
			margin-bottom: 16px;
			@include breakpoint(xs) {
				@include font(card-title);
				margin-bottom: 24px;
			}
		}
	}
</style>