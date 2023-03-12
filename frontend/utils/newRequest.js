import axios from "axios";

export const newRequest = axios.create({
  // baseURL: "https://express-app-lyart.vercel.app/api",
  baseURL: "/api",
  withCredentials: true,
});
