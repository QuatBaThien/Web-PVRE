import type { SelectOption } from '../types/common';

export const LOB_OPTIONS: SelectOption[] = [
  { label: 'Hàng hải', value: 'Marine' },
  { label: 'Tài sản', value: 'Property' },
  { label: 'Kỹ thuật', value: 'Engineering' },
  { label: 'Xe cơ giới', value: 'Motor' },
  { label: 'Con người', value: 'Health' },
];

export const RI_TYPE_OPTIONS: SelectOption[] = [
  { label: 'Treaty', value: 'Treaty' },
  { label: 'Facultative', value: 'Facultative' },
  { label: 'Quota Share', value: 'Quota Share' },
  { label: 'Surplus', value: 'Surplus' },
];

export const COMPANY_OPTIONS: SelectOption[] = [
  { label: 'HNR', value: 'HNR' },
  { label: 'PVI', value: 'PVI' },
  { label: 'VINARE', value: 'VINARE' },
  { label: 'KIC', value: 'KIC' },
  { label: 'KORE', value: 'KORE' },
];

export const WORKING_YEARS: number[] = [2024, 2025, 2026, 2027];
