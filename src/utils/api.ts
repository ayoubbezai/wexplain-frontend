import axios from "axios";

// Backend base URL
const API_BASE_URL = "http://localhost:8000/api";

// Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Important for httpOnly cookie
});

export default api;
