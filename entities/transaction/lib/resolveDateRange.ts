import type { GetTransactionsReq } from '../model/getTransactionsReq';

const getMonthRange = (referenceDate: Date) => {
  const year = referenceDate.getFullYear();
  const month = referenceDate.getMonth();
  const start = new Date(year, month, 1);
  const end = new Date(year, month + 1, 0, 23, 59, 59, 999);

  return { start, end };
};

export const resolveDateRange = (payload: GetTransactionsReq) => {
  if (payload.referenceDate) {
    return getMonthRange(payload.referenceDate);
  }

  return {
    start: payload.startDate,
    end: payload.endDate,
  };
};
