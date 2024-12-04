import axios from "axios";

const storedUser = window.localStorage.getItem("userInfo");
const user = storedUser ? JSON.parse(storedUser) : null;

const token = user?.token || null;

export const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
  headers: {
    Authorization: token ? `Bearer ${token}` : "",
  },
});
