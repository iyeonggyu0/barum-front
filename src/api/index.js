import axios from "axios";

// 환경 변수 기반 URL과 기본 API 접두사(/api/v1) 결합
const baseURL = `${import.meta.env.VITE_API_BASE_URL}/api/v1`;

export const api = axios.create({
  baseURL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

export default api;
