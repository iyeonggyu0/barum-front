import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { menuButtonStyle } from "./MenuButton.style";
import { useNavigate } from "react-router-dom";

const MenuButton = () => {
  const nav = useNavigate();
  return (
    <div onClick={() => nav("/setting")} css={menuButtonStyle}>
      <FontAwesomeIcon icon={faBars} />
    </div>
  );
};
export default MenuButton;
