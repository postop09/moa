export const normalizeBudget = (budget?: number | null) => {
  if (budget === undefined || budget === null || budget <= 0) {
    return null;
  }
  return budget;
};
