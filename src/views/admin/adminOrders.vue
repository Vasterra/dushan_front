<script lang="ts" setup>
	import { useAdminOrdersStore } from "@/stores/admin/orders";
	import { onMounted, ref } from "vue";
	import { useEventBus } from "@vueuse/core/index";
	import DefaultTable from "@/components/ui/DefaultTable.vue"
	import StatusName from "@/components/admin/orders/StatusName.vue"
	import DepartureDateTime from "@/components/admin/orders/DepartureDateTime.vue"
	import PickupLocation from "@/components/admin/orders/PickupLocation.vue"
	import DropOffLocation from "@/components/admin/orders/DropOffLocation.vue"

	const store = useAdminOrdersStore();
	const changeBgColor = useEventBus('changeBgColor')
	const tableColumns = ref([
		{name: "Status", key: "status_id", component: StatusName},
		{name: "Full name", key: "full_name"},
		{name: "Email", key: "email"},
		{name: "Phone", key: "phone"},
		{name: "Departure date time", key: "departure_date", component: DepartureDateTime},
		{name: "Pickup location", key: "", component: PickupLocation},
		{name: "Drop off location", key: "", component: DropOffLocation},
		{name: "Adults", key: "adults"},
		{name: "Children", key: "children"},
		{name: "Cost €", key: "cost"},
		{name: "Actions", key: ""},
	])

	onMounted(() => {
		changeBgColor.emit('white');
		store.getOrders()
	})
</script>
<template>
	<div class="wrapper" style="max-width: 1500px; margin: 0 auto;">
		<h1>Orders</h1>
		<div style="margin-top: 48px;">
			<DefaultTable :is-admin="true" :items="store.orders" :columns="tableColumns"/>
		</div>
	</div>
</template>