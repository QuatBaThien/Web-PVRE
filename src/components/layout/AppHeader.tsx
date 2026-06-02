import { Layout } from 'antd';
import { TopMenuBar } from './TopMenuBar';

export function AppHeader() {
  return (
    <Layout.Header className="sticky top-0 z-30 !h-auto !bg-white/95 !px-0 !py-0 shadow-[0_8px_24px_rgba(15,23,42,0.06)] backdrop-blur">
      <div className="border-b border-slate-200 px-6 py-4">
        <TopMenuBar />
      </div>
    </Layout.Header>
  );
}
