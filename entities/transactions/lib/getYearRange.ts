export const getYearRange = (year: number) => {
  if (!Number.isInteger(year) || year < 1970 || year > 9999) {
    throw new Error(`Invalid year: ${year}`);
  }

  return {
    startDate: `${year}-01-01`,
    endDate: `${year + 1}-01-01`,
  };
};
