import axios from "axios";

export const newRequest = axios.create({
  // baseURL: "http://192.168.1.100:3000/api",
  baseURL: "/api",
  withCredentials: true,
});
