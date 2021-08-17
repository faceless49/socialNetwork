import axios, { AxiosResponse } from 'axios';

const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers: {
    'API-KEY': ''
  }
});

export const usersAPI = {
  getUsers(currentPage: number, pageSize: number) {
    return instance
      .get(`users?page=${currentPage}&count=${pageSize}`)
      .then((response) => response.data);
  },
  follow(currentPage: number, pageSize: number) {
    return instance
      .get(`follow?page=${currentPage}&count=${pageSize}`)
      .then((response) => response.data);
  }
};
