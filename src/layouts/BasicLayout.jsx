import { theme } from "@/styles/theme";

const BasicLayout = ({ children, styleObj }) => {
  const style = {
    width: "100%",
    height: "100%",
    padding: "26px 20px",
    position: "relative",
    ...theme.flex.colStart,

    overflowY: "auto",
    // 파이어폭스 스크롤바 숨김
    scrollbarWidth: "none",

    // IE, Edge 스크롤바 숨김
    msOverflowStyle: "none",

    // 크롬, 사파리, 오페라 스크롤바 숨김
    "&::-webkit-scrollbar": {
      display: "none",
    },

    "& header": {
      ...theme.flex.rowBetween,
      alignItems: "center",
      width: "100%",
      marginBottom: "26px",

      "& p, & span": {
        ...theme.fonts.micro,
        color: theme.colors.ink3,
      },
    },
    "& nav": {
      marginTop: "20px",
    },
  };

  return <main css={[style, styleObj]}>{children}</main>;
};

export default BasicLayout;
