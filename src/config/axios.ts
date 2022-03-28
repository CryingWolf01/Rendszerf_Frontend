import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { BACKEND_URL } from "./constants";
import { getToken, removeToken, tokenExists } from "../shared/util/authToken";

const TIMEOUT = 30 * 10000;

const instance = axios.create({
  baseURL: BACKEND_URL,
  timeout: TIMEOUT,
});
/*
async function onRequestSuccess(config: AxiosRequestConfig) {
  const token = getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    config.withCredentials = true;
  }

  return config;
}

function onResponseSuccess(response: AxiosResponse) {
  return response;
}

function onResponseError(error: any) {
  if (error.response?.status === 401 && tokenExists()) {
    removeToken();
    window.location.replace(`${window.location.origin}/login`);
  }
  return Promise.reject(error.response);
}

instance.interceptors.request.use(onRequestSuccess);
instance.interceptors.response.use(onResponseSuccess, onResponseError);
*/
export default instance;