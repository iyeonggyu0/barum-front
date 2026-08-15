import { useEffect } from "react";
import { getAnonymousToken } from "@/utils/supabase";
import { isMockMode } from "@/utils/isMockMode";

const AuthBootstrap = () => {
  useEffect(() => {
    if (isMockMode()) {
      console.log("🧪 목업 모드: 앱 초기 Supabase 익명 인증을 건너뜁니다.");
      return;
    }

    getAnonymousToken()
      .then(({ userId }) => {
        console.log(`✅ 익명 세션 준비 완료: ${userId}`);
      })
      .catch((err) => {
        console.error("❌ 앱 초기 익명 세션 생성 실패:", err);
      });
  }, []);

  return null;
};

export default AuthBootstrap;
