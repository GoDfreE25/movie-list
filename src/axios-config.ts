import axios, { AxiosError } from "axios";

export const baseAxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});
baseAxiosInstance.interceptors.response.use(
  (response) => response,
  async (e) => {
    const { response } = e as AxiosError;
    if (response) {
      console.error(response);
    }

    return Promise.reject(e);
  }
);
