import { Card, Result } from 'antd';
import { Construction } from 'lucide-react';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { topMenus } from '../../config/menuConfig';
import { PageHeader } from '../../components/common/PageHeader';
import type { BreadcrumbItem } from '../../types/common';

export function PlaceholderPage() {
  const params = useParams<{ module: string; function: string }>();

  const menuItem = useMemo(
    () => topMenus.flatMap((group) => group.children).find((item) => item.path.endsWith(`/${params.module}/${params.function}`)),
    [params.function, params.module],
  );

  const breadcrumbItems: BreadcrumbItem[] = [
    { key: 'home', title: 'Trang chủ' },
    { key: 'module', title: menuItem?.label ?? 'Chức năng đang phát triển' },
  ];

  return (
    <>
      <PageHeader
        title={menuItem?.label ?? 'Chức năng đang phát triển'}
        subtitle="Placeholder route đã được chuẩn hóa để tiếp tục triển khai theo từng phân hệ."
        breadcrumbItems={breadcrumbItems}
      />
      <Card className="rounded-2xl shadow-panel">
        <Result
          icon={<Construction size={58} className="mx-auto text-brand-secondary" />}
          title={menuItem?.label ?? 'Chức năng đang phát triển'}
          subTitle="Chức năng này sẽ được phát triển trong giai đoạn tiếp theo."
        />
      </Card>
    </>
  );
}
