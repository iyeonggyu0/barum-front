import Header from "./Header/Header";
import Menu from "./Menu/Menu";
import { theme } from "@/styles/theme";

const HomeLayout = ({ children }) => {
  const style = {
    width: "100%",
    height: "100%",
    padding: "26px 20px",
    position: "relative",
    overflowY: "hidden",

    ...theme.flex.colBetween,
  };

  const divStyle = {
    width: "100%",
    height: "calc(100% - 68px)",
    overflowY: "auto",
  };
  return (
    <main css={style}>
      <div css={divStyle}>
        <Header />
        <section>{children}</section>
      </div>
      <Menu />
    </main>
  );
};
export default HomeLayout;
