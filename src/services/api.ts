import { strings } from "@/constants";
import axios, { AxiosError } from "axios";

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_TMDB_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  params: {
    api_key: process.env.EXPO_PUBLIC_TMDB_API_KEY,
  },
});

api.interceptors.request.use(
  (config) => {
    if (__DEV__) {
      console.log(`[API] ${config.method?.toUpperCase()} ${config.url}`);
    }
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const status = error.response?.status;

    if (status === 401)
      return Promise.reject(new Error(strings.errors.invalidApiKey));
    if (status === 404)
      return Promise.reject(new Error(strings.errors.notFound));
    if (status === 429)
      return Promise.reject(new Error(strings.errors.tooManyRequests));
    if (status && status >= 500)
      return Promise.reject(new Error(strings.errors.serverError));
    if (!error.response)
      return Promise.reject(new Error(strings.errors.networkError));

    return Promise.reject(error);
  },
);

export default api;
