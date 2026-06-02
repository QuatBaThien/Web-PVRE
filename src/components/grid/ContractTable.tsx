import { Table } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import type { InwardContract } from '../../types/contract';
import { formatCurrency, formatDate, formatPercent } from '../../utils/format';
import { StatusBadge } from '../common/StatusBadge';

interface ContractTableProps {
  dataSource: InwardContract[];
  selectedRowKeys: React.Key[];
  onSelectionChange: (keys: React.Key[]) => void;
  onRowClick: (record: InwardContract) => void;
  onRowDoubleClick: (record: InwardContract) => void;
}

const columns: TableColumnsType<InwardContract> = [
  { title: 'Mã đơn vị', dataIndex: 'branchCode', key: 'branchCode', fixed: 'left', width: 110, sorter: (a, b) => a.branchCode.localeCompare(b.branchCode) },
  { title: 'Trạng thái', dataIndex: 'status', key: 'status', width: 120, render: (value: InwardContract['status']) => <StatusBadge status={value} /> },
  { title: 'LOB', dataIndex: 'lob', key: 'lob', width: 120, sorter: (a, b) => a.lob.localeCompare(b.lob) },
  { title: 'Ngày chứng từ', dataIndex: 'accountingDate', key: 'accountingDate', width: 130, render: formatDate, sorter: (a, b) => a.accountingDate.localeCompare(b.accountingDate) },
  { title: 'Contract Ref', dataIndex: 'contractRef', key: 'contractRef', width: 150, sorter: (a, b) => a.contractRef.localeCompare(b.contractRef) },
  { title: 'Policy No', dataIndex: 'policyNo', key: 'policyNo', width: 130 },
  { title: 'Contract Name', dataIndex: 'contractName', key: 'contractName', width: 240 },
  { title: 'Mã công ty TBH', dataIndex: 'reinsurerCode', key: 'reinsurerCode', width: 140 },
  { title: 'Follower', dataIndex: 'follower', key: 'follower', width: 120 },
  { title: 'R/I Type', dataIndex: 'riType', key: 'riType', width: 140 },
  { title: 'UY', dataIndex: 'underwritingYear', key: 'underwritingYear', width: 90, sorter: (a, b) => a.underwritingYear - b.underwritingYear },
  { title: 'Ngày đầu', dataIndex: 'inceptionDate', key: 'inceptionDate', width: 120, render: formatDate },
  { title: 'Ngày cuối', dataIndex: 'expiryDate', key: 'expiryDate', width: 120, render: formatDate },
  { title: 'Currency', dataIndex: 'currency', key: 'currency', width: 100 },
  { title: 'Sum Insured', dataIndex: 'sumInsured', key: 'sumInsured', width: 150, align: 'right', render: (value: number, record) => formatCurrency(value, record.currency) },
  { title: 'Premium', dataIndex: 'premium', key: 'premium', width: 150, align: 'right', render: (value: number, record) => formatCurrency(value, record.currency) },
  { title: 'Share %', dataIndex: 'sharePercent', key: 'sharePercent', width: 100, align: 'right', render: formatPercent },
  { title: 'Người được BH', dataIndex: 'insuredName', key: 'insuredName', width: 220 },
  { title: 'Phí Net', dataIndex: 'netPremium', key: 'netPremium', width: 150, align: 'right', render: (value: number, record) => formatCurrency(value, record.currency) },
  { title: 'Phí Net VND', dataIndex: 'netPremiumVnd', key: 'netPremiumVnd', width: 160, align: 'right', fixed: 'right', render: (value: number) => formatCurrency(value, 'VND') },
];

export function ContractTable({
  dataSource,
  selectedRowKeys,
  onSelectionChange,
  onRowClick,
  onRowDoubleClick,
}: ContractTableProps) {
  const rowSelection: TableProps<InwardContract>['rowSelection'] = {
    selectedRowKeys,
    onChange: (keys: React.Key[]) => onSelectionChange(keys),
  };

  return (
    <Table<InwardContract>
      rowKey="id"
      columns={columns}
      dataSource={dataSource}
      rowSelection={rowSelection}
      pagination={{ pageSize: 12, showSizeChanger: true, showTotal: (total) => `Tổng ${total} bản ghi` }}
      scroll={{ x: 2800, y: 560 }}
      onRow={(record) => ({
        onClick: () => onRowClick(record),
        onDoubleClick: () => onRowDoubleClick(record),
      })}
    />
  );
}
