import Header from "./Header/Header";
import Menu from "./Menu/Menu";
import { theme } from "@/styles/theme";

const HomeLayout = ({ children, buttons }) => {
  const style = {
    width: "100%",
    height: "100%",
    padding: "26px 20px",
    position: "relative",
    overflowY: "hidden",
    gap: "18px",
    ...theme.flex.colBetween,

    "& .button-box": {
      ...theme.flex.colEnd,
      gap: "12px",
    },
  };

  const divStyle = {
    ...theme.flex.colStart,
    width: "100%",
    flex: 1,
    position: "relative",
    overflowY: "auto",
    // 파이어폭스 스크롤바 숨김
    scrollbarWidth: "none",

    // IE, Edge 스크롤바 숨김
    msOverflowStyle: "none",

    // 크롬, 사파리, 오페라 스크롤바 숨김
    "&::-webkit-scrollbar": {
      display: "none",
    },
  };

  return (
    <main css={style}>
      <div css={divStyle}>
        <Header />
        {children}
      </div>
      <div className="button-box">
        {buttons}
        <Menu />
      </div>
    </main>
  );
};
export default HomeLayout;
