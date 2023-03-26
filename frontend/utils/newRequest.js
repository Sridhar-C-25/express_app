import axios from "axios";

export const newRequest = axios.create({
  baseURL:
    process.env.NODE_ENV == "production"
      ? import.meta.env.VITE_APP_API_BASE_URL_PROD
      : import.meta.env.VITE_APP_API_BASE_URL_DEV,
  withCredentials: true,
});
