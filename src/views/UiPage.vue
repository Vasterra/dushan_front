<script lang="ts" setup>
	import CustomInput from "@/components/ui/CustomInput"
	import CustomSwitch from "@/components/ui/CustomSwitch"
	import LineArrowIcon from "@/components/icons/LineArrowIcon"
	import CustomDropdown from "@/components/ui/CustomDropdown"
	import PassengerDropdown from "@/components/ui/PassengerDropdown"
	import CustomLocations from "@/components/ui/CustomLocations"
	import AdditionalStopCard from "@/components/AdditionalStopCard"
	import CustomButton from "@/components/ui/CustomButton"
	import CountButton from "@/components/ui/CountButton"
	import SuccessOrderForm from "@/components/SuccessOrderForm"
	import YandexMap from "@/components/YandexMap"
	import CustomDateTime from "@/components/ui/CustomDateTime"
	import { ref } from "vue";

	const value = ref('')
	const valueSwitch = ref(false)


	const items = ref([
		{id: 1, name: "Sedan"},
		{id: 2, name: "Minivan"},
		{id: 3, name: "Luxury sedan"},
	])
</script>
<template>
	<div style="margin: 20px; display: flex; flex-direction: column; gap: 20px">
		<CountButton :is-disabled="false" :is-plus="true"/>
		<CountButton :is-disabled="false" :is-plus="false"/>
		<CountButton :is-disabled="true" :is-plus="true"/>
		<CountButton :is-disabled="true" :is-plus="false"/>
		<CustomSwitch v-model="valueSwitch"/>
		<CustomInput label="Error" id="error" name="error" v-model="value" :is-error="true" error-message="Required field"/>
		<CustomInput label="First name *" id="first_name" name="first_name" v-model="value"/>
		<CustomInput label="Custom notes" id="custom_notes" name="custom_notes" v-model="value" :is-textarea="true"/>
		<PassengerDropdown label="Number of the passengers*"/>
		<CustomLocations/>
		<CustomDropdown :items="items" label="Car type *" id="car_type" name="car_type"/>
		<CustomDropdown :items="items" label="Car type *" id="car_type" name="car_type" :is-error="true"
										error-message="Required field"/>
		<AdditionalStopCard/>
		<CustomButton text="Pay and Complete"/>
		<CustomButton text="Disabled" :is-disabled="true"/>
		<CustomButton text="Search a trip" :with-icon="true">
			<template #icon>
				<LineArrowIcon/>
			</template>
		</CustomButton>
		<!--		<CustomCalendar/>-->
		<CustomDateTime/>
		<YandexMap/>
		<SuccessOrderForm/>
	</div>
</template>
<style>
</style>