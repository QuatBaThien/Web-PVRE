import { Tabs } from 'antd';
import type { TabsProps } from 'antd';

interface NestedTabsProps {
  items: TabsProps['items'];
  size?: 'small' | 'middle' | 'large';
}

export function NestedTabs({ items, size = 'middle' }: NestedTabsProps) {
  return <Tabs items={items} size={size} />;
}
