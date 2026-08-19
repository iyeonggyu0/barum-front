import { LeftButton, MenuButton } from "@/components";
import { theme } from "@/styles/theme";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const style = {
    ...theme.flex.rowStart,
    gap: "16px",
    width: "100%",
    marginBottom: "26px",
  };

  const nav = useNavigate();

  return (
    <header css={style}>
      <span onClick={() => nav(-1)}>
        <LeftButton />
      </span>
      <MenuButton />
    </header>
  );
};
export default Header;
