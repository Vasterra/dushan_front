<template>
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
		//background-color: $black;
	}

	.wrapper {
		max-width: 1230px;
		margin: 0 auto;
	}

	.w-100 {
		width: 100%;
	}
</style>
