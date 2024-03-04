<script lang="ts" setup>
	/* eslint-disable */
	import { ref, watch } from "vue";
	import CustomInput from "@/components/ui/CustomInput"
	import CalendarIcon from "@/components/icons/CalendarIcon"
	import TimesIcon from "@/components/icons/TimesIcon"

	const date = ref(null)
	const isOpen = ref(false)
	const minDate = ref(new Date())
	const popover = ref({
		visibility: 'focus',
	});

	const emit = defineEmits(['changeOpen', 'updateDate'])

	const openCalendar = () => {
		isOpen.value = true
		emit('changeOpen', true);
	}
	const closeCalendar = () => {
		isOpen.value = false
		emit('changeOpen', false);
	}

	watch(() => date.value, () => {
		if (date.value) {
			emit('updateDate', date.value)
		}
	})
</script>
<template>
	<div class="custom-calendar">
		<VDatePicker
			@popover-did-show="openCalendar"
			@popover-did-hide="closeCalendar"
			v-model.string="date" :popover="popover"
			:min-date="minDate"
			:locale="{ id: 'en', masks: { input: 'MMMM DD, YYYY', weekdays: 'WW' } }">
			<template #default="{ inputValue, inputEvents }">
				<div class="input-block">
					<CustomInput
						label="Departure Date*"
						id="departure_date"
						name="departure_date"
						:value="inputValue"
						v-model="date"
						:is-border-transparent="true"
						v-on="inputEvents"/>
					<CalendarIcon class="input-block__icon calendar" v-if="!date"/>
					<TimesIcon class="input-block__icon" v-else @click="date = null"/>
				</div>

			</template>
		</VDatePicker>
	</div>
</template>
<style lang="scss">
	.custom-calendar {
		position: relative;

		.input-block {
			position: relative;
			width: 100%;

			&__icon {
				cursor: pointer;
				position: absolute;
				right: 20px;
				top: 0;
				transform: translate(0, 100%);

				&.calendar {
					right: 15px;
				}

				@include breakpoint(xs) {
					right: 8px;
					top: 0;
					transform: translate(0, 100%);
					&.calendar {
						right: 8px;
					}
				}
			}
		}
	}


	.vc-day {
		min-height: 26px;
	}

	.vc-popover-content-wrapper {
		width: 384px !important;
		transform: translate3d(-2px, 44px, 0px) !important;

		.vc-popover-content {
			.vc-popover-content-wrapper:last-of-type {
				width: 164px !important;
			}
		}
	}

	.vc-container.vc-monthly.vc-blue.vc-light.vc-bordered {
		width: 100%;
	}

	.vc-day-content {
		width: 22px !important;
		height: 26px !important;
		padding: 5px !important;
		border-radius: 4px !important;
		gap: 10px !important;
	}

	.vc-highlight-bg-solid.vc-highlight {
		width: 22px !important;
		height: 26px !important;
		background-color: $red !important;
	}

	.vc-highlight-content-solid.vc-blue {
		border: 1px solid $red !important;
		background-color: $red !important;
	}

	.vc-focus:focus-within {
		box-shadow: 0 0 0 2px rgb(196, 22, 28, 0.4) !important;
	}

	.vc-day-content.vc-disabled {
		color: $gray !important;

		&:focus-within {
			box-shadow: none !important;
		}

		&:hover {
			background-color: $white !important;
			cursor: default !important;
		}
	}

	.vc-pane-layout .vc-header {
		display: flex !important;
		margin-left: 40px !important;
	}

	.vc-header .vc-title, .vc-arrow.vc-next.vc-focus, .vc-arrow.vc-prev.vc-focus {
		background-color: $white !important;
	}

	.vc-arrow.vc-next.vc-focus, .vc-arrow.vc-prev.vc-focus {
		color: $black;

		&:focus-within {
			box-shadow: none !important;
		}
	}

	.vc-weekday {
		font-size: 12px !important;
		font-weight: 500 !important;
		line-height: 16px !important;
		text-transform: uppercase !important;
		color: $gray !important;
	}
</style>