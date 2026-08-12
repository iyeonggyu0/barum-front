import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MenuButtonStyle } from "./MenuButton.style";

const MenuButton = () => {
  return (
    <div css={MenuButtonStyle}>
      <FontAwesomeIcon icon={faBars} />
    </div>
  );
};
export default MenuButton;
