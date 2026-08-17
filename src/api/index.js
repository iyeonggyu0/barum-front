import axios from "axios";
import { getAnonymousToken } from "@/utils/supabase";
import { isMockMode } from "@/utils/isMockMode";

// 환경 변수 기반 URL과 기본 API 접두사(/api/v1) 결합
const baseURL = `${import.meta.env.VITE_API_BASE_URL}/api/v1`;

export const api = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use(async (config) => {
  if (isMockMode()) {
    return config;
  }

  const hasAuthorization = config.headers?.Authorization || config.headers?.authorization;

  if (hasAuthorization) {
    return config;
  }

  const { token } = await getAnonymousToken();

  config.headers = {
    ...config.headers,
    Authorization: `Bearer ${token}`,
  };

  return config;
});

export default api;
