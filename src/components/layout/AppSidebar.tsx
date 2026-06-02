import { useMemo } from 'react';
import { Avatar, Layout, Progress, Tooltip, Typography } from 'antd';
import {
  BarChart3,
  ChevronLeft,
  ChevronRight,
  FolderKanban,
  LayoutDashboard,
  LogOut,
  ReceiptText,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppStore } from '../../store/appStore';

const dashboardSections = [
  {
    key: 'overview',
    label: 'Tổng quan',
    description: 'Theo dõi KPI vận hành trong ngày',
    icon: LayoutDashboard,
    path: '/placeholder/reports/dashboard-dieu-hanh',
  },
  {
    key: 'workspace',
    label: 'Xử lý nghiệp vụ',
    description: 'Mở nhanh phân hệ đang làm việc',
    icon: FolderKanban,
    path: '/reinsurance/inward-contracts',
  },
  {
    key: 'settlement',
    label: 'Đối soát',
    description: 'Theo dõi thanh toán và chứng từ',
    icon: ReceiptText,
    path: '/placeholder/finance/quan-ly-doi-soat',
  },
  {
    key: 'analytics',
    label: 'Báo cáo nhanh',
    description: 'Xem số liệu tổng hợp và cảnh báo',
    icon: BarChart3,
    path: '/placeholder/reports/bao-cao-nghiep-vu',
  },
];

const quickStats = [{ key: 'tasks', label: 'Hồ sơ chờ duyệt', value: '12', icon: Sparkles }];

export function AppSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const sidebarCollapsed = useAppStore((state) => state.sidebarCollapsed);
  const sidebarPreviewExpanded = useAppStore((state) => state.sidebarPreviewExpanded);
  const setSidebarCollapsed = useAppStore((state) => state.setSidebarCollapsed);
  const setSidebarPreviewExpanded = useAppStore((state) => state.setSidebarPreviewExpanded);

  const isExpanded = !sidebarCollapsed || sidebarPreviewExpanded;
  const isCollapsedView = !isExpanded;

  const currentSection = useMemo(
    () => dashboardSections.find((section) => location.pathname.startsWith(section.path)),
    [location.pathname],
  );

  const openSidebarPreview = () => {
    if (sidebarCollapsed) {
      setSidebarPreviewExpanded(true);
    }
  };

  const renderNavButton = (item: (typeof dashboardSections)[number]) => {
    const Icon = item.icon;
    const active = currentSection?.key === item.key;
    const button = (
      <button
        key={item.key}
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          navigate(item.path);
        }}
        className={`flex w-full items-center rounded-2xl border px-3 py-3 text-left transition ${
          isCollapsedView ? 'justify-center' : 'gap-3'
        } ${
          active
            ? 'border-brand-primary bg-[rgba(26,60,110,0.1)] text-brand-primary shadow-sm'
            : 'border-transparent bg-slate-50 text-slate-600 hover:border-slate-200 hover:bg-white'
        }`}
      >
        <span
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${
            active ? 'bg-brand-primary text-white' : 'bg-white text-slate-500'
          }`}
        >
          <Icon size={18} />
        </span>
        {!isCollapsedView ? (
          <span className="min-w-0">
            <span className="block truncate text-sm font-semibold">{item.label}</span>
            <span className="block truncate text-xs text-slate-400">{item.description}</span>
          </span>
        ) : null}
      </button>
    );

    return isCollapsedView ? (
      <Tooltip key={item.key} placement="right" title={item.label}>
        {button}
      </Tooltip>
    ) : (
      button
    );
  };

  return (
    <Layout.Sider
      collapsed={isCollapsedView}
      width={336}
      collapsedWidth={96}
      theme="light"
      trigger={null}
      className={`app-sidebar-motion sticky top-0 h-screen !overflow-hidden border-r border-slate-200 ${
        isCollapsedView ? 'app-sidebar-collapsed' : 'app-sidebar-expanded'
      }`}
      onClick={openSidebarPreview}
    >
      <div className="app-sidebar-shell flex h-screen min-h-0 flex-col bg-[linear-gradient(180deg,#f8fbff_0%,#f3f6fb_44%,#eef2f7_100%)]">
        <div className="shrink-0 border-b border-slate-200/80 px-4 py-4">
          <div className={`flex items-start ${isCollapsedView ? 'justify-center' : 'justify-between gap-3'}`}>
            <div className={`flex ${isCollapsedView ? 'justify-center' : 'gap-3'}`}>
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-primary text-white shadow-[0_12px_32px_rgba(26,60,110,0.22)]">
                <ShieldCheck size={20} />
              </div>
              {!isCollapsedView ? (
                <div className="app-sidebar-fadein-delayed min-w-0">
                  <Typography.Text className="block text-xs font-semibold uppercase tracking-[0.22em] text-brand-secondary">
                    PVIRe
                  </Typography.Text>
                  <Typography.Title level={5} className="!mb-1 !text-brand-primary">
                    Hệ thống Quản lý Tái bảo hiểm
                  </Typography.Title>
                  <Typography.Text className="block text-sm text-slate-500">Insurance Workspace</Typography.Text>
                </div>
              ) : null}
            </div>

            {!isCollapsedView ? (
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  setSidebarCollapsed(true);
                }}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-500 transition hover:border-brand-secondary hover:text-brand-primary"
                aria-label="Thu gọn sidebar"
              >
                <ChevronLeft size={18} />
              </button>
            ) : null}
          </div>
        </div>

        <div className="app-sidebar-scroll enterprise-scrollbar min-h-0 flex-1 overflow-y-auto px-4 py-4">
          {isCollapsedView ? (
            <div className="mb-3 flex justify-center">
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  setSidebarPreviewExpanded(true);
                }}
                className="flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-500 transition hover:border-brand-secondary hover:text-brand-primary"
                aria-label="Mở rộng sidebar"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          ) : null}

          <div className="space-y-3">{dashboardSections.map(renderNavButton)}</div>

          {!isCollapsedView ? (
            <>
              <div className="app-sidebar-fadein-delayed mt-6 rounded-3xl border border-slate-200 bg-white p-4 shadow-[0_16px_40px_rgba(15,23,42,0.06)]">
                <div className="flex items-center justify-between">
                  <Typography.Text className="text-sm font-semibold text-slate-800">Trạng thái hệ thống</Typography.Text>
                  <Typography.Text className="text-xs text-emerald-600">On track</Typography.Text>
                </div>
                <div className="mt-4 space-y-3">
                  <div>
                    <div className="mb-1 flex items-center justify-between text-xs text-slate-500">
                      <span>Tiến độ xử lý hồ sơ</span>
                      <span>78%</span>
                    </div>
                    <Progress percent={78} showInfo={false} strokeColor="#1A3C6E" trailColor="#E2E8F0" />
                  </div>
                  <div>
                    <div className="mb-1 flex items-center justify-between text-xs text-slate-500">
                      <span>Đồng bộ báo cáo</span>
                      <span>64%</span>
                    </div>
                    <Progress percent={64} showInfo={false} strokeColor="#0066CC" trailColor="#E2E8F0" />
                  </div>
                </div>
              </div>

              <div className="app-sidebar-fadein-delayed mt-6 grid grid-cols-1 gap-3">
                {quickStats.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.key} className="rounded-3xl border border-slate-200 bg-white p-4 shadow-[0_14px_32px_rgba(15,23,42,0.05)]">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-brand-primary">
                          <Icon size={18} />
                        </div>
                        <div>
                          <Typography.Text className="block text-xl font-semibold text-slate-800">{item.value}</Typography.Text>
                          <Typography.Text className="text-xs uppercase tracking-[0.16em] text-slate-400">
                            {item.label}
                          </Typography.Text>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          ) : null}
        </div>

        <div className="shrink-0 border-t border-slate-200/80 p-4">
          <div
            className={`rounded-[28px] border border-[#8db8ff] bg-white p-4 shadow-[0_18px_40px_rgba(26,60,110,0.08)] ${
              isCollapsedView ? 'flex justify-center' : ''
            }`}
          >
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                navigate('/placeholder/help/huong-dan-su-dung');
              }}
              className={`w-full text-left ${isCollapsedView ? 'flex justify-center' : 'flex items-center gap-3'}`}
            >
              <Avatar
                size={isCollapsedView ? 44 : 48}
                style={{ backgroundColor: '#1A3C6E' }}
                icon={<ShieldCheck size={isCollapsedView ? 18 : 20} />}
              />
              {!isCollapsedView ? (
                <>
                  <div className="app-sidebar-fadein-delayed min-w-0 flex-1">
                    <Typography.Text className="block truncate text-lg font-semibold text-slate-800">
                      Nguyễn Quản trị
                    </Typography.Text>
                    <Typography.Text className="block text-sm text-slate-500">Senior Underwriter</Typography.Text>
                  </div>
                  <ChevronRight size={18} className="text-slate-400" />
                </>
              ) : null}
            </button>

            {!isCollapsedView ? (
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  navigate('/placeholder/system/dang-xuat');
                }}
                className="app-sidebar-fadein-delayed mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-600 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600"
              >
                <LogOut size={16} />
                <span>Đăng xuất</span>
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </Layout.Sider>
  );
}
