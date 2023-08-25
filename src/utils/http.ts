import Axios, { AxiosRequestConfig } from 'axios';
import { ACCESS_TOKEN_KEY } from '../atoms/user';

const axios = Axios.create({
  baseURL: 'https://cakyyy.me/api/v1',
});
axios.interceptors.request.use((config) => {
  config.headers.Authorization = localStorage.getItem(ACCESS_TOKEN_KEY);
  return config;
}, (error) => Promise.reject(error));
axios.interceptors.response.use((response) => response.data, (error) => {
  if (error.response) {
    return Promise.reject(error.response.data);
  }
  return Promise.reject(error);
});

export const http = {
  get: function get<Response = unknown>(url: string, config?: AxiosRequestConfig<any>) {
    return axios.get<Response>(url, config).then(res => res.data);
  },
  post: function post<Response = unknown, Request = any>(url: string, body?: Request) {
    return axios.post<Response>(url, body).then(res => res.data);
  },
};
