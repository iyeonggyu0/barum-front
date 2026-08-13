import { useState, useEffect, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { getWeather } from "../api/getWeather";

const QUERY_KEY = ["home_weather"];

export const useGetWeatherQuery = (options = {}) => {
  const isGeolocationSupported = typeof window !== "undefined" && "geolocation" in navigator;

  const [location, setLocation] = useState({
    lat: null,
    lon: null,
    error: isGeolocationSupported ? null : "이 브라우저에서는 Geolocation이 지원되지 않습니다.",
  });

  const fetchLocation = useCallback(() => {
    if (!isGeolocationSupported) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
          error: null, // 성공 시 어차피 null로 덮어씌워짐
        });
      },
      (error) => {
        setLocation({
          lat: null,
          lon: null,
          error: "위치 정보를 가져오는데 실패했습니다: " + error.message,
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      },
    );
  }, [isGeolocationSupported]);

  useEffect(() => {
    fetchLocation();
  }, [fetchLocation]);

  const isLocationReady = location.lat !== null && location.lon !== null;

  const queryResult = useQuery({
    queryKey: [...QUERY_KEY, location.lat, location.lon],
    queryFn: () => getWeather(location.lat, location.lon),
    ...options,
    enabled: isLocationReady && (options.enabled ?? true),
  });

  const retry = () => {
    if (location.error) {
      setLocation((prev) => ({ ...prev, error: null }));
      fetchLocation();
    } else {
      queryResult.refetch();
    }
  };

  return {
    ...queryResult,
    locationError: !!location.error,
    statusCode: queryResult.error ? queryResult.error.response?.status || queryResult.error.status || 500 : queryResult.isSuccess ? 200 : null,
    retry,
  };
};
