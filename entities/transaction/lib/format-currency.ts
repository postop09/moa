export const formatCurrency = (amount: number): string => {
  return `${new Intl.NumberFormat('ko-KR').format(Math.round(amount))}원`;
};

export const formatCompactCurrency = (amount: number): string => {
  if (amount >= 10000) {
    const man = amount / 10000;
    return `${man % 1 === 0 ? man : man.toFixed(1)}만원`;
  }
  return formatCurrency(amount);
};
