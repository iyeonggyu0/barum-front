import { theme } from "@/styles/theme";
import { RecordItem } from "..";

const RecordList = ({ listData = [], isLoading = false, isError = false, skeletonCount = 2 }) => {
  const hasData = Array.isArray(listData) && listData.length > 0;
  const shouldShowSkeleton = isLoading || (!isError && !hasData);

  return (
    <section css={{ ...theme.flex.colStart, gap: "16px" }}>
      {shouldShowSkeleton && Array.from({ length: skeletonCount }).map((_, idx) => <RecordItem key={`record-skeleton-${idx}`} isSkeleton />)}

      {!shouldShowSkeleton && listData.map((item, idx) => <RecordItem key={`${item?.date || "record"}-${idx}`} data={item} />)}
    </section>
  );
};
export default RecordList;
