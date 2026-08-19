// src/utils/supabase.js (또는 src/api/auth.js 등 사용하는 폴더 구조에 맞게 생성)
import { createClient } from "@supabase/supabase-js";

// 환경 변수에서 Supabase URL과 익명(Anon) 키를 가져옵니다.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const isValidHttpUrl = (value) => {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
};

const createSupabaseClientSafely = () => {
  if (!isValidHttpUrl(supabaseUrl)) {
    console.error("❌ VITE_SUPABASE_URL 값이 유효한 http/https URL이 아닙니다:", supabaseUrl);
    return null;
  }

  if (!supabaseKey || supabaseKey.trim().length < 20) {
    console.error("❌ VITE_SUPABASE_ANON_KEY 값이 비어있거나 올바르지 않습니다.");
    return null;
  }

  return createClient(supabaseUrl, supabaseKey);
};

export const supabase = createSupabaseClientSafely();

let anonymousSignInPromise = null;
let cachedAnonymousAuth = null;

/**
 * Supabase 익명 세션을 확인하고, 없으면 익명 로그인을 수행하여 토큰과 userId를 반환합니다.
 */
export const getAnonymousToken = async () => {
  if (!supabase) {
    throw new Error("Supabase 환경 변수가 올바르지 않습니다. .env의 VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY를 확인하세요.");
  }

  if (cachedAnonymousAuth) {
    return cachedAnonymousAuth;
  }

  // 1. 이미 존재하는 세션이 있는지 확인
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session?.access_token) {
    cachedAnonymousAuth = {
      token: session.access_token,
      userId: session.user.id,
    };

    return cachedAnonymousAuth;
  }

  // 2. 세션이 없다면 익명 로그인 진행 (앱 최초 진입 시)
  if (!anonymousSignInPromise) {
    anonymousSignInPromise = supabase.auth
      .signInAnonymously()
      .then(({ data, error }) => {
        if (error) {
          console.error("Supabase 익명 로그인 실패:", error.message);
          throw error;
        }

        if (!data?.session?.access_token || !data?.user?.id) {
          throw new Error("Supabase 익명 세션 응답이 올바르지 않습니다.");
        }

        cachedAnonymousAuth = {
          token: data.session.access_token,
          userId: data.user.id,
        };

        return cachedAnonymousAuth;
      })
      .finally(() => {
        anonymousSignInPromise = null;
      });
  }

  return anonymousSignInPromise;
};
