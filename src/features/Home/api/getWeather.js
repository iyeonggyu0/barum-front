import api from "@/api";

export const getWeather = async (lat, lon) => {
  if (import.meta.env.VITE_USE_MOCKUP === "true") {
    const { weatherMockup } = await import("@/mockup/weatherMockup.js");
    return weatherMockup;
  }

  const res = await api.get(`/weather?lat=${lat}&lon=${lon}`);
  return res.data;
};
