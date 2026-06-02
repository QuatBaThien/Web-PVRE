import { Breadcrumb, Space, Typography } from 'antd';
import type { ReactNode } from 'react';
import type { BreadcrumbItem } from '../../types/common';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbItems: BreadcrumbItem[];
  extra?: ReactNode;
}

export function PageHeader({ title, subtitle, breadcrumbItems, extra }: PageHeaderProps) {
  return (
    <div className="rounded-2xl bg-white/95 px-6 py-5 shadow-panel">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <Space direction="vertical" size={4}>
          <Breadcrumb items={breadcrumbItems.map((item) => ({ title: item.title }))} />
          <Typography.Title level={3} className="!mb-0 !text-brand-primary">
            {title}
          </Typography.Title>
          {subtitle ? <Typography.Text type="secondary">{subtitle}</Typography.Text> : null}
        </Space>
        {extra}
      </div>
    </div>
  );
}
