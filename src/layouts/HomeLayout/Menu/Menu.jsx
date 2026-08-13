import { useLocation, useNavigate } from "react-router-dom";
import { menuStyle } from "./Menu.style";
import { theme } from "@/styles/theme";

const Menu = () => {
  const { pathname } = useLocation();
  const nav = useNavigate();

  const urlCheck = (url) => {
    // url이 "/"인 경우는 정확히 일치해야 하고,
    // 그 외의 경우는 pathname이 해당 url로 시작하는지 확인합니다.
    const isMatch = url === "/" ? pathname === "/" : pathname.startsWith(url);

    if (isMatch) {
      return {
        color: theme.colors.greenInk,
        backgroundColor: theme.colors.greenSoft,
        fontWeight: "900 !important",
      };
    } else {
      return {};
    }
  };

  return (
    <nav css={menuStyle}>
      <span onClick={() => nav("/")} css={urlCheck("/")}>
        오늘
      </span>
      <span onClick={() => nav("/makeup")} css={urlCheck("/makeup")}>
        화장대
      </span>
      <span onClick={() => nav("/record")} css={urlCheck("/record")}>
        기록
      </span>
      <div className="bg-box"></div>
    </nav>
  );
};
export default Menu;
