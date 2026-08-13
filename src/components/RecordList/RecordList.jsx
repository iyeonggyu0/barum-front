import { theme } from "@/styles/theme";
import { RecordItem } from "..";

const RecordList = ({ listData }) => {
  return (
    <section css={{ ...theme.flex.colStart, gap: "16px" }}>
      {listData?.map((item, idx) => (
        <RecordItem key={idx} data={item} />
      ))}
    </section>
  );
};
export default RecordList;
