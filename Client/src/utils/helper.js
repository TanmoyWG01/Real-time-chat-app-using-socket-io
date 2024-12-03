import axios from "axios";

const user = JSON.parse(window.localStorage.getItem("userInfo"));

const token = user.token || null;

export const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
