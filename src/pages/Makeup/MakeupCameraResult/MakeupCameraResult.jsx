import { BarButton, LeftButton } from "@/components";
import { BasicLayout } from "@/layouts";
import { useLocation, useNavigate } from "react-router-dom";
import { layoutStyle, makeupCameraResultStyle } from "./MakeupCameraResult.style";
import { theme } from "@/styles/theme";
import { useEffect } from "react";
import { usePostOcrProduct } from "@/features/Makeup/hooks/usePostOcrProduct";

const MakeupCameraResult = () => {
  const location = useLocation();
  const nav = useNavigate();

  // B 방식: OCR 응답 전체를 그대로 저장 API payload에 담아 전송
  const data = location.state?.ocrResult;
  const ingredients = data?.ingredients || [];

  console.log("인식 결과:", data);

  const { mutate: saveOcrProduct, isPending: isSaving } = usePostOcrProduct({
    onSuccess: () => {
      nav("/makeup");
    },
    onError: (error) => {
      console.error("OCR 제품 등록 실패:", error);
      nav("/makeup/create/error");
    },
  });

  useEffect(() => {
    if (!data) {
      nav("/makeup/create/error?type=NO_DATA");
    }
  }, [data, nav]);

  const handleSave = () => {
    if (!data || isSaving) {
      return;
    }

    saveOcrProduct(data);
  };

  return (
    <BasicLayout styleObj={layoutStyle}>
      <header>
        <span onClick={() => nav(-1)}>
          <LeftButton />
        </span>
        인식 결과 확인
      </header>
      <section css={makeupCameraResultStyle}>
        <div className="top-box">
          <div className="img-box">{/* 이미지 */}</div>
          <div className="text-box">
            <p className="sub">제품 별칭</p>
            <p className="title">{data?.alias || "-"}</p>
          </div>
        </div>
        <div className="list">
          <div className="text-box">
            <p className="title">읽은 성분</p>
            <p className="num">{ingredients.length}개</p>
          </div>
          <div className="box">
            {ingredients.map((item, idx) => (
              <div key={idx}>
                <div className="idx">{idx + 1}</div>
                <div className={`name ${item.matched ? "" : "not-matched"}`}>{item.matched ? item.standardName : item.rawName}</div>
              </div>
            ))}
          </div>
          <p className="caption">정확하지 않은 성분이 많으면 다시 촬영해 주세요</p>
        </div>
      </section>
      <nav css={{ ...theme.flex.rowBetween, gap: "12px" }}>
        <div onClick={() => nav("/makeup/create/camera")} css={{ width: "35%" }}>
          <BarButton colorTheme="white">다시 촬영</BarButton>
        </div>
        <div css={{ width: "65%" }} onClick={handleSave}>
          <BarButton colorTheme={!data || isSaving ? "none" : "green"}>{isSaving ? "저장 중..." : "저장"}</BarButton>
        </div>
      </nav>
    </BasicLayout>
  );
};

export default MakeupCameraResult;
