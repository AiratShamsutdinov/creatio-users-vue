<template>
	<div>
    <b-form class="create-user" v-if="user">
		<b-form-group id="input-group-name" label="Имя:" label-for="input-2">
			<b-form-input
				id="input-name"
				v-model="user.name"
				type="text"
				placeholder="Введите имя"
				:state="nameValidation"
			></b-form-input>
			<b-form-invalid-feedback :state="nameValidation">
				Это поле обязательно для заполнения.
			</b-form-invalid-feedback>
		</b-form-group>

		<b-form-group id="input-group-contact-name" label="ФИО контакта:" label-for="input-contact-name">
			<b-form-input
				id="input-contact-name"
				v-model="user.contact.name"
				type="text"
				required
				placeholder="Введите ФИО контакта"
				:state="contactNameValidation"
			></b-form-input>
			<b-form-invalid-feedback :state="contactNameValidation">
				Это поле обязательно для заполнения.
			</b-form-invalid-feedback>
		</b-form-group>

		<b-form-group id="input-group-checkboxes">
			<b-form-checkbox
				v-model="user.active"
				id="checkboxes-active"
				inline
			>Активен
			</b-form-checkbox>
			<b-form-checkbox
				v-model="user.isDirectoryEntry"
				id="checkboxes-directory"
				inline
			>Доменный пользователь
			</b-form-checkbox>
			<b-form-checkbox
				v-model="user.synchronizeWithLdap"
				id="checkboxes-synchronize"
				inline
			>Синхронизировать с LDAP
			</b-form-checkbox>
		</b-form-group>

		<b-button variant="success" @click="onSubmit">Сохранить</b-button>
		<b-button variant="light" @click="onCancel">Отмена</b-button>
    </b-form>
  </div>
</template>>

<script>

import { UsersService } from "../services/UsersService.js";

/**
 * Новый пользователь.
 */
export default {
	name: "NewUser",
	data: function () {
		return {
			user: {
				id: "",
				name: "",
				createdOn: new Date(),
				active: false,
				isDirectoryEntry: false,
				synchronizeWithLdap: false,
				contact: {
					id: null,
					name: ""
				}
			}
		}
	},
	computed: {
		/**
		 * Валидация поля Имя.
		 */
		nameValidation: function() {
			return !!this.user.name &&
					this.user.name.length > 0;
		},

		/**
		 * Валидация поля Имя контакта.
		 */
		contactNameValidation: function() {
			return !!this.user.contact &&
					!!this.user.contact.name &&
					this.user.contact.name.length > 0;
		}
	},
	methods: {
		/**
		 * Сохранить пользователя.
		 * @param {any} event Событие нажатия на кнопку.
		 */
		onSubmit: function(event) {
			var scope = this;
			event.preventDefault()
			this.user.contact.id = this.$uuid.v1();
			UsersService.createUser(this.user)
				.then(function () {
					scope.$router.push({ name: "users" });
				})
				.catch((error) => {
					window.console.log(error);
				});
		},

		/**
		 * Отменить изменения.
		 * @param {any} event Событие нажатия на кнопку.
		 */
		onCancel: function(event) {
			event.preventDefault();
			this.user = {};
			this.$router.push({ name: "users" });
		}
	},
	created: function() {
		this.user.id = this.$uuid.v1();
	}
};
</script>

<style lang="scss" scoped>
.create-user {
	align-content: center;
    max-width: 600px;
    max-height: 400px;
}
</style>