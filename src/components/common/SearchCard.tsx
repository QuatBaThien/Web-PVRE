import { Card } from 'antd';
import type { ReactNode } from 'react';

interface SearchCardProps {
  title: string;
  extra?: ReactNode;
  children: ReactNode;
}

export function SearchCard({ title, extra, children }: SearchCardProps) {
  return (
    <Card
      title={title}
      extra={extra}
      className="rounded-2xl shadow-panel"
      styles={{ body: { paddingBottom: 12 } }}
    >
      {children}
    </Card>
  );
}
