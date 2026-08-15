import { useRef, useState } from "react";
import { BarButton, LeftButton } from "@/components";
import { useNavigate, useSearchParams } from "react-router-dom";
import { routineSelfieLayoutStyle, routineSelfieStyle } from "./RoutineSelfie.style";
import { BasicLayout } from "@/layouts";
import { Camera } from "@/features/Routine/components";
import { useRoutineImageUpload } from "@/features/Routine/hooks/useRoutineImageUpload";

const RoutineSelfie = () => {
  const nav = useNavigate();
  const [searchParams] = useSearchParams();
  const fileInputRef = useRef(null);
  const cameraCaptureRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);

  const { mutate: uploadRoutineImage } = useRoutineImageUpload();

  const cameraParam = searchParams.get("camera");

  const handleUploadImage = (file) => {
    if (!file || isUploading) {
      return;
    }

    setIsUploading(true);

    uploadRoutineImage(
      { file, purpose: "SELFIE" },
      {
        onSuccess: ({ storagePath }) => {
          setIsUploading(false);
          const imagePath = storagePath || "mock-user/2026-08-14.jpg";
          nav(`/routine/create/loading?img_path=${encodeURIComponent(imagePath)}`);
        },
        onError: () => {
          setIsUploading(false);
        },
      },
    );
  };

  const handleFileSelect = (event) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      handleUploadImage(selectedFile);
    }
    event.target.value = "";
  };

  const handleCapture = async () => {
    if (!cameraCaptureRef.current) {
      return;
    }

    const file = await cameraCaptureRef.current();
    if (file) {
      handleUploadImage(file);
    }
  };

  const handleSkip = () => {
    nav("/routine/create/loading?img=none");
  };

  return (
    <BasicLayout styleObj={routineSelfieLayoutStyle}>
      <header>
        <span onClick={() => nav(-1)}>
          <LeftButton />
        </span>
        <p>선택 단계예요</p>
      </header>
      <section css={routineSelfieStyle}>
        <input ref={fileInputRef} type="file" accept="image/*" hidden onChange={handleFileSelect} />

        <p className="title">
          오늘 피부를
          <br />한 장 남겨볼까요
        </p>
        <Camera captureRef={cameraCaptureRef} onCapture={handleUploadImage} />
        <p className="caption">사진은 나만 볼 수 있어요</p>
        {cameraParam !== "none" && (
          <div className="button-box">
            <div
              className="text"
              css={{ cursor: isUploading ? "not-allowed" : "pointer", opacity: isUploading ? 0.5 : 1 }}
              onClick={() => fileInputRef.current?.click()}>
              사진 불러오기
            </div>
            <div className="button" onClick={handleCapture} css={{ opacity: isUploading ? 0.5 : 1 }}>
              <div></div>
            </div>
            <div className="text">{/* 공간용 */}</div>
          </div>
        )}
        {cameraParam === "none" && (
          <div className="select-button">
            <BarButton clickFun={() => fileInputRef.current?.click()}>사진 선택</BarButton>
          </div>
        )}
      </section>
      <nav>
        <BarButton colorTheme="white" clickFun={handleSkip}>
          오늘은 건너 뛰기
        </BarButton>
      </nav>
    </BasicLayout>
  );
};
export default RoutineSelfie;
