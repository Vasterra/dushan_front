<script lang="ts" setup></script>

<template>
	<div class="card">
		<div class="card__title">
			<slot name="name"></slot>
		</div>
		<slot></slot>
	</div>
</template>
<style lang="scss" scoped>
	.card {
		padding: 32px;
		background-color: $white;
		border-radius: 12px;

		&__title {
			@include font(card-title)
		}
	}
</style>