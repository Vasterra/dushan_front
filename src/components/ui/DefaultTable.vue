<script lang="ts" setup>
	/* eslint-disable */
	import { useEventBus } from "@vueuse/core"

	interface ColumnItem {
		name: string
		key: string
		width?: number
	}

	const props = defineProps<{
		columns: ColumnItem[]
		items: []
	}>()

	const clickTableRow = useEventBus("clickTableRow")

	const clickHandler = (item: ColumnItem, key: string) => {
		clickTableRow.emit(item)
	}

</script>
<template>
	<div class="table-responsive w-100 isAdmin" ref="infiniteScroll">
		<div class="table w-100" v-if="items.length">
			<div class="table-row columns">
				<div
					class="table-col"
					v-for="(column, index) in columns"
					:key="index"
					:style="{ width: column.width ? `${column.width}px` : 'auto' }"
				>
					<div class="flex justify-content-between align-items-center">
						<p class="p-0 m-0">{{ column.name }}</p>
					</div>
				</div>
			</div>
			<template v-for="(item,item_index) in items" :key="item.id">
				<div class="table-row cursor-pointer">
					<div
						class="table-col"
						:class="column.key === 'actions' ? 'actions' : ''"
						v-for="(column, index) in columns"
						:key="index"
						@click.stop.prevent="clickHandler(item, column.key)"
					>
						<template v-if="column.component">
							<component :data="item" :is="{...column.component}"/>
						</template>
						<p class="p-0 m-0" v-else>{{ item[column.key] }}</p>
					</div>
				</div>
			</template>
		</div>

		<div class="flex-col justify-content-center align-items-center w-100" v-else>
			<p class="mt-24">You have no active parcels</p>
		</div>
	</div>
</template>
<style lang="scss" scoped>
	.table-responsive {
		overflow-x: auto;
		-webkit-overflow-scrolling: touch;
		max-height: 900px;
		overflow-y: scroll;

		&.isAdmin {
			max-height: none;
		}

		.table {
			overflow-x: auto;
			overflow-y: hidden;
			display: table;
			table-layout: fixed;
			width: 100%;
			border-collapse: collapse;

			.details {
				display: table-row;
				transform: scaleY(0);
				visibility: collapse;
				transform-origin: top;

				&.isOpen {
					visibility: visible;
					transform: scaleY(1);
					background-color: $gray-1;

					.block {
						padding: 24px;
					}
				}
			}

			&-row {
				display: table-row;
				background-color: $gray-1;
				position: relative;
				border-top: 12px solid $white;

				&:hover {
					background-color: rgba(0, 0, 0, 0.05) !important;
				}

				&.columns {
					background-color: $white;

					p {
						text-transform: uppercase;
						font-size: 10px;
						color: $gray-6;
						text-align: left;
					}
				}
			}

			&-col {
				height: auto;
				display: table-cell;
				padding-right: 10px;
				padding-top: 24px;
				padding-bottom: 24px;

				&:first-of-type {
					width: 140px;
					padding-left: 24px;
					border-radius: 0.25rem 0 0 0.25rem;
				}

				&:last-of-type {
					padding-right: 24px;
					border-radius: 0 0.25rem 0.25rem 0;

					.flex {
						justify-content: flex-end !important;
					}
				}

				&.actions {
					vertical-align: middle;
				}

				p {
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
					font-size: 14px;
				}
			}
		}
	}
</style>