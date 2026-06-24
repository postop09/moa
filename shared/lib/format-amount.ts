export function formatAmountInput(value: string): string {
  const digits = value.replace(/[^\d]/g, '');

  if (!digits) {
    return '';
  }

  return Number(digits).toLocaleString('ko-KR');
}

export function parseAmountInput(value: string): number {
  const digits = value.replace(/[^\d]/g, '');

  if (!digits) {
    return 0;
  }

  return Number(digits);
}
