import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { menuButtonStyle } from "./MenuButton.style";

const MenuButton = () => {
  return (
    <div css={menuButtonStyle}>
      <FontAwesomeIcon icon={faBars} />
    </div>
  );
};
export default MenuButton;
