<script lang="ts" setup>
	/* eslint-disable */
	import Card from "@/components/WhiteCard"
	import CustomInput from "@/components/ui/CustomInput"
	import { reactive, watch } from "vue";

	const info = reactive({
		first_name: null,
		last_name: null,
		phone: null,
		email: null,
	})
	const emit = defineEmits(['updateInfo'])

	watch(() => info, () => {
		emit('updateInfo', info)
	}, {deep: true})
</script>
<template>
	<Card class="card__row" :with-title="true">
		<template #name>Personal information</template>
		<template #body>
			<div class="body-card">
				<CustomInput label="First name*" id="first_name" name="first_name" v-model="info.first_name"/>
				<CustomInput label="Last Name*" id="last_name" name="last_name" v-model="info.last_name"/>
				<CustomInput label="Phone Number*" id="phone" name="phone" v-model="info.phone"/>
				<CustomInput label="Email*" id="email" name="email" v-model="info.email"/>
			</div>
		</template>
	</Card>
</template>