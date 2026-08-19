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

const Camera = ({ captureRef }) => {
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

          const file = new File([blob], `ocr-${Date.now()}.jpg`, {
            type: "image/jpeg",
          });

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
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: { ideal: "environment" } },
          audio: false,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }

        if (searchParams.has("camera")) {
          const next = new URLSearchParams(searchParams);
          next.delete("camera");
          setSearchParams(next, { replace: true });
        }
      } catch (err) {
        console.error("카메라 접근 에러:", err);
        setError("카메라 권한을 허용해주세요.");

        const next = new URLSearchParams(searchParams);
        next.set("camera", "none");
        setSearchParams(next, { replace: true });
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
        <span>후면 카메라</span>
      </div>

      <div css={guideStyle} />

      <video ref={videoRef} autoPlay playsInline muted css={videoStyle} />

      <p css={textStyle}>전성분표를 가이드 안에 맞춰 주세요</p>
    </div>
  );
};

export default Camera;
