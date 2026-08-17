import api from "@/api";
import { isMockMode } from "@/utils/isMockMode";

export const getWeather = async (lat, lon) => {
  const isMock = isMockMode();
  if (isMock) {
    const { weatherMockup } = await import("@/mockup/weatherMockup");
    return weatherMockup;
  }

  const res = await api.get(`/weather?lat=${lat}&lon=${lon}`);
  return res.data;
};
