export const formatValue = (value: number): string =>
  Intl.NumberFormat(Intl.NumberFormat().resolvedOptions().locale, {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
