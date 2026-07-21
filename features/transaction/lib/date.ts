export const formatDisplayDate = (date: Date): string => {
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
};

export const formatMonthDate = (date: Date): string => {
  return `${date.getMonth() + 1}월 ${date.getDate()}일`;
};

export const dateFromYearMonth = (yearMonth: string) => {
  const match = /^(\d{4})-(\d{2})$/.exec(yearMonth);
  if (!match) {
    return new Date();
  }

  const year = Number(match[1]);
  const month = Number(match[2]);
  const now = new Date();

  if (now.getFullYear() === year && now.getMonth() + 1 === month) {
    return now;
  }

  return new Date(year, month - 1, 1);
};
