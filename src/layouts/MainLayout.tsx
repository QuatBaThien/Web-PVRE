import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import { AppHeader } from '../components/layout/AppHeader';
import { AppSidebar } from '../components/layout/AppSidebar';
import { useAppStore } from '../store/appStore';

export function AppShell() {
  const setSidebarPreviewExpanded = useAppStore((state) => state.setSidebarPreviewExpanded);
  const collapseSidebarPreview = () => setSidebarPreviewExpanded(false);

  return (
    <Layout className="min-h-screen">
      <Layout hasSider className="min-h-screen">
        <AppSidebar />
        <div className="flex min-w-0 flex-1 flex-col" onMouseDownCapture={collapseSidebarPreview} onTouchStartCapture={collapseSidebarPreview}>
          <AppHeader />
          <Layout className="min-w-0 flex-1">
            <Layout.Content className="p-6">
              <div className="mx-auto flex max-w-[1880px] flex-col gap-6">
                <Outlet />
              </div>
            </Layout.Content>
          </Layout>
        </div>
      </Layout>
    </Layout>
  );
}
