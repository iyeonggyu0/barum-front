import { barButtonStyle } from "./BarButton.style";

/**
 * 하단 고정 또는 넓은 영역을 차지하는 바(Bar) 형태의 버튼 컴포넌트입니다.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - 버튼 내부에 표시될 텍스트나 요소
 * @param {"green" | "white" | "red" | "none"} [props.colorTheme="green"] - 버튼 색상 테마 (기본값: "green")
 * @param {Function} [props.clickFun=() => {}] - 버튼 클릭 시 실행될 콜백 함수
 */
const BarButton = ({ children, colorTheme = "green", clickFun = () => {} }) => {
  return (
    <div css={barButtonStyle(colorTheme)} onClick={clickFun}>
      {children}
    </div>
  );
};
export default BarButton;
