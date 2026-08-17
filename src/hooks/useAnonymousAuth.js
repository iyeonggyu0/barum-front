import { useState, useCallback } from "react";
import { getAnonymousToken } from "@/utils/supabase";

export const useAnonymousAuth = () => {
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [authError, setAuthError] = useState(null);

  const getAuthToken = useCallback(async () => {
    setIsAuthLoading(true);
    setAuthError(null);

    try {
      const auth = await getAnonymousToken();
      setIsAuthLoading(false);
      return auth;
    } catch (err) {
      console.error("Supabase 인증 에러:", err.message);
      setAuthError(err);
      setIsAuthLoading(false);
      throw err;
    }
  }, []);

  return {
    getAuthToken,
    isAuthLoading,
    authError,
  };
};
