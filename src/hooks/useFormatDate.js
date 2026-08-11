/**
 * 날짜를 'YYYY. MM. DD' 형태로 포맷하는 훅
 * @returns (dateStr: string) => string
 */
const useFormatDate = () => {
  return (dateStr) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    if (Number.isNaN(d.getTime())) return dateStr;
    return `${d.getFullYear()}. ${String(d.getMonth() + 1).padStart(2, "0")}. ${String(d.getDate()).padStart(2, "0")}`;
  };
};

export default useFormatDate;
