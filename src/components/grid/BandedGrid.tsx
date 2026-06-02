import { Card, Tabs } from 'antd';
import type { TabsProps } from 'antd';
import type { ReactNode } from 'react';

interface BandedGridProps {
  title: string;
  items: TabsProps['items'];
  extra?: ReactNode;
}

export function BandedGrid({ title, items, extra }: BandedGridProps) {
  return (
    <Card title={title} extra={extra} className="rounded-2xl shadow-panel">
      <Tabs items={items} />
    </Card>
  );
}
