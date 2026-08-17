import { css } from "@emotion/react";
import { theme } from "@/styles/theme";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const style = css({
  borderRadius: "999px",
  width: "100%",
  border: "none",
  padding: "0 18px",
  margin: 0,
  ...theme.flex.rowStart,
  alignItems: "center",
  backgroundColor: "white",
  gap: "12px",

  "& .icon": {
    color: theme.colors.ink4,
    cursor: "pointer",
  },
  "& input": {
    outline: "none",
    border: "none",
    padding: "16px 4px",
    flex: 1,
  },
});

const MakeupSearchInput = ({ onChangeFun, onEnter }) => {
  // 엔터 키 입력 감지 함수
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onEnter();
    }
  };

  return (
    <div css={style}>
      <input type="text" placeholder="제품명 또는 브랜드 검색" onChange={onChangeFun} onKeyDown={handleKeyDown} />
      <FontAwesomeIcon icon={faMagnifyingGlass} className="icon" onClick={onEnter} />
    </div>
  );
};

export default MakeupSearchInput;
