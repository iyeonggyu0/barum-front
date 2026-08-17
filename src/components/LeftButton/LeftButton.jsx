import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { menuButtonStyle } from "./LeftButton.style";

const LeftButton = () => {
  return (
    <div css={menuButtonStyle}>
      <FontAwesomeIcon icon={faAngleLeft} />
    </div>
  );
};
export default LeftButton;
