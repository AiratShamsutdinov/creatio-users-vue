<template>
	<div class="users">
		<div class = "add-button-container">
			<b-button variant="success" @click="onAddButtonClick">Добавить пользователя</b-button>
		</div>
		<div>
			<b-table
				class="users-table"
				ref="selectableTable"
				selectable
				striped
				hover
				responsive="sm"
				:select-mode="selectMode"
				:items="users"
				:fields="fields"
				:borderless="true"
				:small:="true"
			>
					<template v-slot:cell(actions)="row">
						<b-button
							size="sm"
							@click="onEditButtonClick(row)"
							class="mr-2"
						>
							Редактировать
						</b-button>
						<b-button
							v-if="row.item.active"
							size="sm"
							@click="onDeactivateButtonClick(row)"
						>
							Деактивировать
						</b-button>
						<b-button
							v-else
							size="sm"
							@click="onActivateButtonClick(row)"
						>
							Активировать
						</b-button>
					</template>
			</b-table>
		</div>
	</div>
</template>

<script>

import { UsersService } from "../services/UsersService.js";

/**
 * Список пользователей.
 */
export default {
	name: "Users",
	data: function () {
		return {
			selectMode: 'single',
			fields: [
				{
					key: 'name',
					label: 'Имя',
					sortable: true
				},
				{
					key: 'createdOn',
					label: 'Дата создания',
					sortable: true,
					formatter: (value) => {
						return new Date(value).toLocaleString()
					}
				},
				{
					key: 'active',
					label: 'Активен',
					sortable: true
				},
				{
					key: 'actions',
					label: ''
				}
			],
			users: []
		}
	},
	methods: {
		/**
		 * Добавить пользователя.
		 */
		onAddButtonClick: function() {
			this.$router.push({ name: "newUser" });
		},

		/**
		 * Редактировать пользователя.
		 * @param {any} row Строка с данными пользователя.
		 */
		onEditButtonClick: function(row) {
			this.$router.push({ name: 'user', params: { id: row.item.id } });
		},

		/**
		 * Активировать пользователя.
		 * @param {any} row Строка с данными пользователя.
		 */
		onActivateButtonClick: function(row) {
			var scope = this;

			UsersService.activateUser(row.item)
				.then(() => {
					row.item.active = false;
					UsersService.getUsers()
						.then((response) => {
							scope.users = response.data;
						})
						.catch((error) => {
							window.console.log(error);
						});
				})
				.catch((error) => {
					window.console.log(error);
				});
		},

		/**
		 * Деактивировать пользователя.
		 * @param {any} row Строка с данными пользователя.
		 */
		onDeactivateButtonClick: function(row) {
			var scope = this;

			UsersService.deactivateUser(row.item)
				.then(() => {
					UsersService.getUsers()
						.then((response) => {
							scope.users = response.data;
						})
						.catch((error) => {
							window.console.log(error);
						});
				})
				.catch((error) => {
					window.console.log(error);
				});
		},

		/**
		 * Получить список пользователей.
		 */
		getUsers: function() {
			var scope = this;

			UsersService.getUsers()
				.then((response) => {
					scope.users = response.data;
				})
				.catch((error) => {
					window.console.log(error);
				});
		}
	},
	created: function() {
		this.getUsers();
	}
};
</script>

<style lang="scss" scoped>
.users {
	padding-right: 10%;
	.add-button-container {
		margin-bottom: 20px;
	}

	.users-table {
		text-align: center;
	}
}
</style>