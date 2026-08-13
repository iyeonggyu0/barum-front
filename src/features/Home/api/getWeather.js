import api from "@/api";
import { weatherMockup } from "@/mockup/weatherMockup";
import { isMockMode } from "@/utils/isMockMode";

export const getWeather = async (lat, lon) => {
  const isMock = isMockMode();
  if (isMock) {
    return weatherMockup;
  }

  const { data } = await api.get(`/weather?lat=${lat}&lon=${lon}`);
  return data;
};
