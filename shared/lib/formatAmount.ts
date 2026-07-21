export const formatAmountInput = (value: string): string => {
  const digits = value.replace(/[^\d]/g, '');
  if (!digits) {
    return '';
  }
  return Number(digits).toLocaleString('ko-KR');
};
export const parseAmountInput = (value: string): number => {
  const digits = value.replace(/[^\d]/g, '');
  if (!digits) {
    return 0;
  }
  return Number(digits);
};
