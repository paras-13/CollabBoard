import axios from "axios";
const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL,
  headers: {
    Accept: "application/json",
  },
  timeout: 10000,
  withCredentials: true,
});
export default api;
