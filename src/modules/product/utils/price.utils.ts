export const toMinorUnit = (value: string, decimals: number): number => {
  const [integerPart, decimalPart = ''] = value.split('.');
  const paddedDecimal = (decimalPart + '0'.repeat(decimals)).slice(0, decimals);
  return Number(BigInt(integerPart + paddedDecimal).toString());
};

export const fromMinorUnit = (amount: bigint, decimals: number): string => {
  const s = amount.toString().padStart(decimals + 1, '0');
  const intPart = s.slice(0, -decimals);
  const decimalPart = s.slice(-decimals);
  return `${intPart}.${decimalPart}`;
};
