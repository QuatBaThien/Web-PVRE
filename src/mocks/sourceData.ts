import type { SourceRecord } from '../types/contract';

const sourceSections = ['Section A', 'Section B', 'Section C', 'Installment', 'Historical'];
const sourceStatuses = ['Đã duyệt', 'Chờ xử lý', 'Đồng bộ'];

export const sourceRecordsMock: SourceRecord[] = Array.from({ length: 18 }, (_, index) => ({
  id: `SRC-${String(index + 1).padStart(3, '0')}`,
  sourceName: `Nguồn dữ liệu ${index + 1}`,
  section: sourceSections[index % sourceSections.length],
  premium: 3500 + index * 420,
  status: sourceStatuses[index % sourceStatuses.length],
  effectiveDate: `2026-${String((index % 9) + 1).padStart(2, '0')}-15`,
}));
