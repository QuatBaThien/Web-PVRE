import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import { AppHeader } from '../components/layout/AppHeader';
import { AppSidebar } from '../components/layout/AppSidebar';

export function AppShell() {
  return (
    <Layout className="min-h-screen">
      <AppHeader />
      <Layout hasSider>
        <AppSidebar />
        <Layout.Content className="p-6">
          <div className="mx-auto flex max-w-[1880px] flex-col gap-6">
            <Outlet />
          </div>
        </Layout.Content>
      </Layout>
    </Layout>
  );
}
