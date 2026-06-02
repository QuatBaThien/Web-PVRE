import { Tag } from 'antd';
import type { ContractStatus } from '../../types/contract';

interface StatusBadgeProps {
  status: ContractStatus;
}

const statusColorMap: Record<ContractStatus, string> = {
  'Hiệu lực': 'success',
  'Chờ duyệt': 'processing',
  'Hết hạn': 'default',
  'Tạm khóa': 'error',
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return <Tag color={statusColorMap[status]}>{status}</Tag>;
}
