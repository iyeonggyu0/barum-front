import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideoSlash } from "@fortawesome/free-solid-svg-icons";
import {
  badgeStyle,
  containerStyle,
  dotStyle,
  guideStyle,
  textStyle,
  videoStyle,
  errorWrapperStyle,
  errorIconBoxStyle,
  errorTitleStyle,
  errorDescStyle,
} from "./Camera.style";
import { useSearchParams } from "react-router-dom";

const Camera = ({ onCapture, captureRef }) => {
  const videoRef = useRef(null);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const captureCurrentFrame = () => {
    const video = videoRef.current;
    if (!video || video.readyState < 2) {
      return null;
    }

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;

    const context = canvas.getContext("2d");
    if (!context) {
      return null;
    }

    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    return new Promise((resolve) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            resolve(null);
            return;
          }

          const file = new File([blob], `selfie-${Date.now()}.jpg`, {
            type: "image/jpeg",
          });

          if (typeof onCapture === "function") {
            onCapture(file);
          }

          resolve(file);
        },
        "image/jpeg",
        0.92,
      );
    });
  };

  useEffect(() => {
    if (captureRef) {
      captureRef.current = captureCurrentFrame;
    }

    return () => {
      if (captureRef) {
        captureRef.current = null;
      }
    };
  }, [captureRef]);

  useEffect(() => {
    let stream = null;

    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" },
          audio: false,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }

        // 2. 성공 시 'camera' 파라미터 삭제 (React Router가 감지하도록 변경)
        if (searchParams.has("camera")) {
          searchParams.delete("camera");
          setSearchParams(searchParams, { replace: true });
        }
      } catch (err) {
        console.error("카메라 접근 에러:", err);
        setError("카메라 권한을 허용해주세요.");

        // 3. 실패 시 'camera=none' 추가 (React Router가 감지하도록 변경)
        searchParams.set("camera", "none");
        setSearchParams(searchParams, { replace: true });
      }
    };

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  if (error) {
    return (
      <div css={errorWrapperStyle}>
        <div css={errorIconBoxStyle}>
          <FontAwesomeIcon icon={faVideoSlash} />
        </div>
        <h3 css={errorTitleStyle}>카메라를 쓸 수 없어요</h3>
        <p css={errorDescStyle}>
          브라우저 설정에서 카메라를 허용하거나,
          <br />
          저장된 사진을 골라 주세요.
        </p>
      </div>
    );
  }

  return (
    <div css={containerStyle}>
      <div css={badgeStyle}>
        <div css={dotStyle} />
        <span>전면 카메라</span>
      </div>

      <div css={guideStyle} />

      <video ref={videoRef} autoPlay playsInline muted css={videoStyle} />

      <p css={textStyle}>얼굴을 가이드 안에 맞춰 주세요</p>
    </div>
  );
};

export default Camera;
