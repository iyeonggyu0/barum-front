import { useAtom } from "jotai";
import { HomeLayout } from "@/layouts";
import { routineSelfieAtom } from "@/atom/selfieAtom";
import { getTodayFormatted } from "@/utils/getTodayFormatted";
import { useLocation } from "react-router-dom";
import { ApplyBox, CrashBox, SelfieBox, SkipBox, WeatherBox } from "@/features/Result/components";
import { theme } from "@/styles/theme";
import { BarButton } from "@/components";
import { useSaveRoutineRecord } from "@/features/Routine/hooks/useSaveRoutineRecord";

const RoutineResult = () => {
  const [selfie] = useAtom(routineSelfieAtom);

  const today = getTodayFormatted();

  const location = useLocation();
  const { savedData, resultData } = location.state || {};
  const { mutate: saveRecord, isPending: isSaving } = useSaveRoutineRecord();

  const style = { ...theme.flex.colStart, alignItems: "start", gap: "20px", width: "100%" };

  const handleSaveRecord = () => {
    if (!savedData) {
      alert("저장할 루틴 데이터가 없습니다.");
      return;
    }

    saveRecord(savedData, {
      onSuccess: (response) => {
        alert(`${response?.date || savedData?.date || today} 기록이 저장되었어요.`);
      },
      onError: (error) => {
        const code = error?.code;
        const message = error?.message || "기록 저장 중 오류가 발생했습니다.";

        switch (code) {
          case "UNAUTHORIZED":
            alert("세션이 만료되어 다시 인증했어요. 저장을 다시 시도해주세요.");
            break;
          case "VALIDATION_ERROR":
            alert(message);
            break;
          case "INVALID_SELFIE_PATH":
            alert("셀카 경로가 올바르지 않아 저장할 수 없어요. 다시 촬영해 주세요.");
            break;
          case "BAD_REQUEST":
            alert("기록 저장 응답이 올바르지 않아 저장에 실패했어요. 잠시 후 다시 시도해 주세요.");
            break;
          case "PRODUCT_NOT_FOUND":
            alert("제품을 찾을 수 없습니다. 목록을 새로고침해 주세요.");
            break;
          case "EMPTY_VANITY":
            alert("보유 제품이 없어 루틴을 저장할 수 없어요. 화장대 탭에서 제품을 먼저 추가해 주세요.");
            break;
          case "OCR_NO_TEXT":
            alert("전성분표를 인식하지 못했어요. 인식 실패 화면으로 이동해 다시 시도해 주세요.");
            break;
          case "AI_TIMEOUT":
            alert("AI 응답 시간이 초과됐어요. 잠시 후 다시 시도해 주세요.");
            break;
          case "EXTERNAL_API_ERROR":
            alert("외부 API 오류가 발생했어요. 잠시 후 다시 시도해 주세요.");
            break;
          default:
            alert(message);
            break;
        }
      },
    });
  };

  return (
    <HomeLayout
      buttons={
        <BarButton colorTheme={isSaving ? "none" : "green"} clickFun={isSaving ? () => {} : handleSaveRecord}>
          {isSaving ? "저장 중..." : "기록 저장"}
        </BarButton>
      }>
      <p css={{ ...theme.fonts.caption, color: theme.colors.ink3 }}>{today}</p>
      <p css={{ ...theme.fonts.display, color: theme.colors.ink1, marginBottom: "20px" }}>오늘의 루틴</p>

      <section css={style}>
        {/* 셀카 */}

        <SelfieBox
          isLoading={!resultData}
          data={{
            img: selfie?.previewUrl || "none",
            text: resultData?.skin?.summary || "",
          }}
        />

        {/* 날씨 */}
        <WeatherBox isLoading={!resultData} data={resultData?.weather || {}} />

        {/* 충돌 crash */}
        <CrashBox isLoading={!resultData} data={resultData?.conflicts || []} />

        {/* 바를 것 */}
        <ApplyBox isLoading={!resultData} data={resultData?.routine?.apply || []} />

        {/* 뺄 것 */}
        <SkipBox isLoading={!resultData} data={resultData?.routine?.skip || []} />
      </section>
    </HomeLayout>
  );
};
export default RoutineResult;
