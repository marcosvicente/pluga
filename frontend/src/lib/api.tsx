import axios, { type AxiosInstance } from "axios";

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const api: AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
});

export default api;
