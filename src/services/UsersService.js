import { ApiConnection } from "@/services/api/ApiConnection";

/**
 * Сервис для работы с пользователями.
 */
export class UsersService {

  /**
   * Базовый url для запросов.
   */
  static get ApiService() { return "users" }

  /**
   * Получить список пользователей.
   */
  static getUsers() {
    return ApiConnection.get("users", { }, { });
  }

  /**
   * Получить пользователя.
   * @param {string} userId Идентификатор пользователя.
   */
  static getUser(userId) {
    return ApiConnection.get("users/" + userId, { }, { });
  }

  /**
   * Обновить данные пользователя.
   * @param {any} user Объект пользователя.
   */
  static updateUser(user) {
    return ApiConnection.put("users/", user , { });
  }

  /**
   * Создать пользователя.
   * @param {any} user Объект пользователя.
   */
  static createUser(user) {
    return ApiConnection.post("users/", user , { });
  }

  /**
   * Активировать пользователя.
   * @param {any} user Объект пользователя.
   */
  static activateUser(user) {
    return ApiConnection.put("users/activate", user, { });
  }

  /**
   * Деактивировать пользователя.
   * @param {any} user Объект пользователя.
   */
  static deactivateUser(user) {
    return ApiConnection.put("users/deactivate", user, { });
  }
}