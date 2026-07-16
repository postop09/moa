export const toISODate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const formatDisplayDate = (date: Date): string => {
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
};

export const formatMonthDate = (date: Date): string => {
  return `${date.getMonth() + 1}월 ${date.getDate()}일`;
};

export const parseISODate = (value: string): Date | null => {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) {
    return null;
  }
  const [, year, month, day] = match;
  const parsed = new Date(Number(year), Number(month) - 1, Number(day));
  if (Number.isNaN(parsed.getTime())) {
    return null;
  }
  return parsed;
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
