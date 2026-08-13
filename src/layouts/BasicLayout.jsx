import { theme } from "@/styles/theme";

const BasicLayout = ({ children, styleObj }) => {
  const style = {
    width: "100%",
    height: "100%",
    padding: "26px 20px",
    position: "relative",
    overflowY: "hidden",

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
