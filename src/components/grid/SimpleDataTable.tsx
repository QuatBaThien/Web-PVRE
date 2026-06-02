import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface SimpleDataTableProps<T extends object> {
  columns: ColumnsType<T>;
  dataSource: T[];
  rowKey: keyof T | ((record: T) => string);
  pagination?: false | { pageSize?: number };
  size?: 'small' | 'middle' | 'large';
}

export function SimpleDataTable<T extends object>({
  columns,
  dataSource,
  rowKey,
  pagination = false,
  size = 'small',
}: SimpleDataTableProps<T>) {
  return (
    <Table<T>
      size={size}
      columns={columns}
      dataSource={dataSource}
      rowKey={rowKey}
      pagination={pagination}
      scroll={{ x: 'max-content' }}
    />
  );
}
