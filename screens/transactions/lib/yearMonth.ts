export const toYearMonth = (date = new Date()) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  return `${year}-${month}`;
};

export const parseYearMonth = (yearMonth: string) => {
  const [year, month] = yearMonth.split('-').map(Number);
  return { year, month };
};

export const shiftYearMonth = (yearMonth: string, delta: number) => {
  const { year, month } = parseYearMonth(yearMonth);
  return toYearMonth(new Date(year, month - 1 + delta, 1));
};

export const formatYearMonthLabel = (yearMonth: string) => {
  const { year, month } = parseYearMonth(yearMonth);
  return `${year}년 ${month}월`;
};
