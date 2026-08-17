import { theme } from "@/styles/theme";

const MakeupCategory = ({ data, setData }) => {
  const baseStyle = {
    padding: "6px 12px",
    borderRadius: "999px",
    backgroundColor: "#fff",
    color: theme.colors.ink2,
    ...theme.fonts.micro,
    cursor: "pointer",
    margin: "8px 0 20px 0",
    transition: "all 0.2s",
  };

  // 선택되었을 때 적용할 스타일
  const selectStyle = {
    color: "#fff",
    backgroundColor: theme.colors.greenDeep,
  };

  const categories = [
    { label: "전체", value: "" },
    { label: "클렌저", value: "CLEANSER" },
    { label: "토너", value: "TONER" },
    { label: "세럼", value: "SERUM" },
    { label: "크림", value: "CREAM" },
    { label: "선크림", value: "SUNSCREEN" },
  ];

  return (
    <ul css={{ ...theme.flex.rowStart, gap: "8px", flexWrap: "wrap" }}>
      {categories.map((cat) => {
        const isSelected = data === cat.value;
        return (
          <li
            key={cat.value}
            // 기본 스타일과 조건부 스타일을 배열로 병합
            css={[baseStyle, isSelected && selectStyle]}
            onClick={() => setData(cat.value)}>
            {cat.label}
          </li>
        );
      })}
    </ul>
  );
};

export default MakeupCategory;
