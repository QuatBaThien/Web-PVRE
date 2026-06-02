import { Card, Col, Row, Typography } from 'antd';
import type { ReactNode } from 'react';

interface FormSectionProps {
  title: string;
  children: ReactNode;
}

export function FormSection({ title, children }: FormSectionProps) {
  return (
    <Card className="rounded-2xl shadow-panel" bodyStyle={{ paddingBottom: 8 }}>
      <Typography.Title level={5} className="!mb-4 !text-brand-primary">
        {title}
      </Typography.Title>
      <Row gutter={[16, 4]}>
        <Col span={24}>{children}</Col>
      </Row>
    </Card>
  );
}
