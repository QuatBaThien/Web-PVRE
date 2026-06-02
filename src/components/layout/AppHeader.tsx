import { Bell, ChevronDown, ShieldCheck } from 'lucide-react';
import { Avatar, Badge, Dropdown, Layout, Select, Space, Typography } from 'antd';
import type { MenuProps } from 'antd';
import { WORKING_YEARS } from '../../utils/constants';
import { useAppStore } from '../../store/appStore';
import { TopMenuBar } from './TopMenuBar';

const userMenuItems: MenuProps['items'] = [
  { key: 'profile', label: 'Thông tin người dùng' },
  { key: 'settings', label: 'Thiết lập cá nhân' },
  { key: 'logout', label: 'Đăng xuất' },
];

export function AppHeader() {
  const workingYear = useAppStore((state) => state.workingYear);
  const setWorkingYear = useAppStore((state) => state.setWorkingYear);

  return (
    <Layout.Header className="sticky top-0 z-30 !h-auto !bg-white/95 !px-0 !py-0 shadow-[0_8px_24px_rgba(15,23,42,0.06)] backdrop-blur">
      <div className="border-b border-slate-200 px-6 py-4">
        <div className="grid grid-cols-[auto_1fr_auto] items-center gap-6">
          <div className="flex items-center gap-4">
            <img src="/logo-hanoire.svg" alt="Hanoi Re" className="h-10 w-auto" />
            <div>
              <Typography.Text className="block text-xs font-semibold uppercase tracking-[0.25em] text-brand-secondary">
                PVIRe
              </Typography.Text>
              <Typography.Title level={4} className="!mb-0 !text-brand-primary">
                Hệ thống Quản lý Tái bảo hiểm
              </Typography.Title>
            </div>
          </div>

          <TopMenuBar />

          <Space size="large">
            <div className="min-w-[108px]">
              <Typography.Text className="mb-1 block text-xs text-slate-500">Năm làm việc</Typography.Text>
              <Select
                value={workingYear}
                className="w-full"
                options={WORKING_YEARS.map((year) => ({ label: year, value: year }))}
                onChange={setWorkingYear}
              />
            </div>

            <Badge count={5} size="small">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-brand-primary">
                <Bell size={18} />
              </div>
            </Badge>

            <Dropdown menu={{ items: userMenuItems }} trigger={['click']}>
              <button
                type="button"
                className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2 text-left transition hover:border-brand-secondary"
              >
                <Avatar style={{ backgroundColor: '#1A3C6E' }} icon={<ShieldCheck size={16} />} />
                <div>
                  <Typography.Text className="block font-semibold text-slate-800">Nguyễn Quản trị</Typography.Text>
                  <Typography.Text className="text-xs text-slate-500">Senior Underwriter</Typography.Text>
                </div>
                <ChevronDown size={16} className="text-slate-400" />
              </button>
            </Dropdown>
          </Space>
        </div>
      </div>
    </Layout.Header>
  );
}
