
import axios, { AxiosError, AxiosResponse } from 'axios'
import createAuthRefreshInterceptor from 'axios-auth-refresh';

import { BASE_URL } from '@/app/config-global';
import { refreshToken } from './tokenRefresher';


//# for react-query-mutations
export const METHODS = {
    GET: 'get',
    POST: 'post',
    PUT: 'put',
    PATCH: 'patch',
    DELETE: 'delete',
};
export type MethodsType = typeof METHODS[keyof typeof METHODS];
//# for refreshing token if needed
const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
});

//$ interceptors setup
axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => Promise.reject(error.response || "some thing went wrong!")
);
//# the main axios instance 
export const privateAxiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
    },
    withCredentials: true
});
//# to set  Authorization header when refreshing
export const setHeaderToken = (token: string) => {
    privateAxiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`
}
//! create Auth Refresh Interceptor
createAuthRefreshInterceptor(privateAxiosInstance, refreshToken, {
    statusCodes: [401],
    pauseInstanceWhileRefreshing: true
});
