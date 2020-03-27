import axios from 'axios';

/**
 * Базовый класс для api сервисов. 
 * Создается инстанс axios, который используется всеми сервисам. Тут заложены базовые настройки для всех http запросов.
 */
export const ApiConnection = axios.create({
  baseURL: "http://172.30.119.243:5000/api/",
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json"
  },
  paramsSerializer: params => {
    return JSON.stringify(params);
  }
});
