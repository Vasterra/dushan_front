<script lang="ts" setup>
	import InstagramIcon from "@/components/icons/InstagramIcon"
	import TwitterIcon from "@/components/icons/TwitterIcon"
	import FacebookIcon from "@/components/icons/FacebookIcon"
	import { useEventBus } from "@vueuse/core";
	import { computed, onMounted, ref } from "vue";

	const setStep = useEventBus('setStep')
	const step = ref(1);

	const classes = computed(() => {
		return `step_${step.value}`
	})

	onMounted(() => {
		setStep.on(data => {
			// @ts-ignore
			step.value = data;
		})
	})
</script>
<template>
	<footer :class="classes">
		<hr class="footer__hr">
		<div class="footer">
			<div class="footer__col">
				<p class="footer__title">Follow our social networks</p>
				<div class="footer__social">
					<div class="footer__social--item">
						<InstagramIcon/>
					</div>
					<div class="footer__social--item">
						<TwitterIcon/>
					</div>
					<div class="footer__social--item">
						<FacebookIcon/>
					</div>
				</div>
			</div>
			<div class="footer__col">
				<p class="footer__title">Image by azerbaijan_stockers on Freepik</p>
			</div>
		</div>
	</footer>
</template>
<style lang="scss" scoped>
	footer {
		width: 100vw;
		margin-top: 20px;
		@include breakpoint(xs) {
			position: absolute;
			bottom: 0;
		}

		.footer {
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 32px 16px 16px;
			flex-direction: column;
			@include breakpoint(xs) {

				align-items: flex-end;
				justify-content: space-between;
				flex-direction: row;
				padding: 16px 24px 24px;
			}

			&__hr {
				height: 1px;
				background-color: $gray;
				margin-left: 16px;
				margin-right: 16px;
				@include breakpoint(xs) {
					margin-left: 24px;
					margin-right: 24px;
				}
			}

			&__title {
				color: $white;
				@include font(additional-stop-name-mobile);
				@include breakpoint(xs) {
					@include font(additional-stop-name)
				}
			}

			&__col {
				&:first-of-type {
					display: flex;
					align-items: center;
					gap: 16px;
					flex-direction: column;
					@include breakpoint(xs) {
						gap: 24px;
						flex-direction: row;
						justify-content: center;
					}

					.footer__social {
						display: flex;
						align-items: center;
						gap: 12px;
						@include breakpoint(xs) {
						}

						&--item {
							background-color: $white;
							height: 40px;
							width: 40px;
							display: flex;
							align-items: center;
							justify-content: center;
							border-radius: 50%;
						}
					}
				}

				&:last-of-type {
					margin-top: 12px;
					@include breakpoint(xs) {
						margin-top: 0;
					}

					.footer__title {
						color: $gray;
						@include font(input-label-fill);
						@include breakpoint(xs) {
							@include font(error-text)
						}
					}
				}
			}
		}

		&.step_2 {
			position: relative;

			.footer__title {
				color: $black;
			}
		}

		&.step_3 {
			position: absolute;
			bottom: 0;

			.footer__title {
				color: $white;
			}
		}
	}


</style>