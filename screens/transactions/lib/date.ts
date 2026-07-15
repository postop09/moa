export const formatDisplayDate = (date: Date): string => {
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
};

export const formatMonthDate = (date: Date): string => {
  return `${date.getMonth() + 1}월 ${date.getDate()}일`;
};
