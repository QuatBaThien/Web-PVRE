import { Breadcrumb } from 'antd';
import type { BreadcrumbItem } from '../../types/common';

interface AppBreadcrumbProps {
  items: BreadcrumbItem[];
}

export function AppBreadcrumb({ items }: AppBreadcrumbProps) {
  return <Breadcrumb items={items.map((item) => ({ title: item.title }))} />;
}
