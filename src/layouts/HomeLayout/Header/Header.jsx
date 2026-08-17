import { LeftButton, MenuButton } from "@/components";
import { theme } from "@/styles/theme";

const Header = () => {
  const style = {
    ...theme.flex.rowBetween,
    width: "100%",
    marginBottom: "26px",
  };

  return (
    <header css={style}>
      <LeftButton />
      <MenuButton />
    </header>
  );
};
export default Header;
