export const getTodayFormatted = () => {
  const today = new Date();

  const month = today.getMonth() + 1; // getMonth()는 0부터 시작하므로 1을 더해줍니다.
  const date = today.getDate();

  // getDay()는 0(일요일)부터 6(토요일)까지의 숫자를 반환합니다.
  const dayNames = ["일", "월", "화", "수", "목", "금", "토"];
  const day = dayNames[today.getDay()];

  return `${month}월 ${date}일 ${day}요일`;
};
