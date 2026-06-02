import dayjs from 'dayjs';

export const formatDate = (value?: string) => (value ? dayjs(value).format('DD/MM/YYYY') : '');

export const formatCurrency = (value: number, currency = 'VND') =>
  new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency,
    maximumFractionDigits: currency === 'VND' ? 0 : 2,
  }).format(value);

export const formatPercent = (value: number) => `${value.toFixed(2)}%`;
