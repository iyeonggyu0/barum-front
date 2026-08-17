import { useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { LeftButton, BarButton } from "@/components";
import { BasicLayout } from "@/layouts";
import { MakeupCameraView } from "@/features/Makeup/components";
import { useMakeupOcrUpload } from "@/features/Makeup/hooks/useMakeupOcrUpload";
import { layoutStyle, makeupCameraStyle, shootButton } from "./MakeupCamera.style";

const MakeupCamera = () => {
  const nav = useNavigate();
  const [searchParams] = useSearchParams();
  const fileInputRef = useRef(null);
  const cameraCaptureRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);

  const { mutate: uploadAndRecognize } = useMakeupOcrUpload();
  const cameraParam = searchParams.get("camera");
  const [alias, setAlias] = useState("");
  const trimmedAlias = alias.trim();
  const isAliasEmpty = !trimmedAlias;

  const handleOcrUpload = (file) => {
    if (!file || isUploading || isAliasEmpty) {
      if (isAliasEmpty) {
        alert("제품 별칭을 먼저 입력해주세요.");
      }
      return;
    }

    setIsUploading(true);

    uploadAndRecognize(
      { file, alias },
      {
        onSuccess: (result) => {
          setIsUploading(false);
          nav("/makeup/create/camera/result", { state: { ocrResult: result } });
        },
        onError: (error) => {
          setIsUploading(false);

          if (error?.code === "OCR_NO_TEXT") {
            nav("/makeup/create/error?type=OCR_NO_TEXT");
            return;
          }

          alert(error?.message || "전성분표 인식에 실패했습니다.");
        },
      },
    );
  };

  const handleFileSelect = (event) => {
    if (isAliasEmpty) {
      alert("제품 별칭을 먼저 입력해주세요.");
      event.target.value = "";
      return;
    }

    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      handleOcrUpload(selectedFile);
    }
    event.target.value = "";
  };

  const handleCapture = async () => {
    if (isAliasEmpty) {
      alert("제품 별칭을 먼저 입력해주세요.");
      return;
    }

    if (!cameraCaptureRef.current) {
      return;
    }

    const file = await cameraCaptureRef.current();
    if (file) {
      handleOcrUpload(file);
    }
  };

  return (
    <BasicLayout styleObj={layoutStyle}>
      <header>
        <span onClick={() => nav(-1)}>
          <LeftButton />
        </span>
        전성분표 촬영
      </header>

      {/* 상태(isUploading)를 함수 인자로 전달 */}
      <section css={makeupCameraStyle}>
        <div className="alias">
          <p>제품 별칭</p>
          <input value={alias} onChange={(e) => setAlias(e.target.value)} type="text" placeholder="예) 저자극 수분 크림" required aria-invalid={isAliasEmpty} />
        </div>
        <section className="camera">
          <input ref={fileInputRef} type="file" accept="image/*" hidden onChange={handleFileSelect} />

          <MakeupCameraView captureRef={cameraCaptureRef} onCapture={handleOcrUpload} />
        </section>
        <div className="caption">
          <p className="title">이렇게 찍으면 좋아요!</p>
          <p className="sub">ㆍ 전성분표 전체가 잘리지 않고 화면에 모두 들어오게 해주세요.</p>
          <p className="sub">ㆍ 글자에 그늘이 지거나 빛이 반사되지 않게 해주세요.</p>
          <p className="sub">ㆍ 글자가 뭉개지지 않도록 흔들림 없이 또렷하게 찍어주세요.</p>
        </div>
      </section>

      <nav css={shootButton}>
        {cameraParam === "none" && (
          <div className="no-camera-container">
            <BarButton
              clickFun={() => {
                if (isAliasEmpty) {
                  alert("제품 별칭을 먼저 입력해주세요.");
                  return;
                }
                fileInputRef.current?.click();
              }}
              colorTheme={isUploading || isAliasEmpty ? "none" : "green"}>
              {isUploading ? "인식 중..." : isAliasEmpty ? "별칭을 입력해주세요" : "사진 선택"}
            </BarButton>
          </div>
        )}
        {cameraParam !== "none" && (
          <div className="button-box">
            <div
              className="text"
              css={{ cursor: isUploading || isAliasEmpty ? "not-allowed" : "pointer", opacity: isUploading || isAliasEmpty ? 0.5 : 1 }}
              onClick={() => {
                if (isAliasEmpty) {
                  alert("제품 별칭을 먼저 입력해주세요.");
                  return;
                }
                fileInputRef.current?.click();
              }}>
              사진 불러오기
            </div>

            <div
              className="button"
              onClick={handleCapture}
              css={{ opacity: isUploading || isAliasEmpty ? 0.5 : 1, cursor: isUploading || isAliasEmpty ? "not-allowed" : "pointer" }}>
              <div></div>
            </div>
            <div className="text">{/* 공간 */}</div>
          </div>
        )}
      </nav>
    </BasicLayout>
  );
};

export default MakeupCamera;
