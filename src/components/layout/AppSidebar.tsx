import { useMemo } from 'react';
import { Layout, Input, Menu } from 'antd';
import type { MenuProps } from 'antd';
import { Search } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { topMenus } from '../../config/menuConfig';
import { useAppStore } from '../../store/appStore';
import type { MenuItemConfig } from '../../types/menu';

function flattenMenu(items: MenuItemConfig[]): MenuItemConfig[] {
  return items.flatMap((item) => (item.children ? [item, ...flattenMenu(item.children)] : [item]));
}

function mapMenuItems(items: MenuItemConfig[]): MenuProps['items'] {
  return items.map((item) => ({
    key: item.path,
    label: item.label,
    icon: item.icon ? <item.icon size={16} /> : undefined,
    children: item.children ? mapMenuItems(item.children) : undefined,
  }));
}

export function AppSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const activeTopMenuKey = useAppStore((state) => state.activeTopMenuKey);
  const sidebarCollapsed = useAppStore((state) => state.sidebarCollapsed);
  const sidebarSearch = useAppStore((state) => state.sidebarSearch);
  const setSidebarCollapsed = useAppStore((state) => state.setSidebarCollapsed);
  const setSidebarSearch = useAppStore((state) => state.setSidebarSearch);

  const currentMenu = topMenus.find((menu) => menu.key === activeTopMenuKey) ?? topMenus[3];

  const filteredChildren = useMemo(() => {
    if (!sidebarSearch.trim()) {
      return currentMenu.children;
    }
    const keyword = sidebarSearch.toLowerCase();
    return flattenMenu(currentMenu.children).filter((item) => item.label.toLowerCase().includes(keyword));
  }, [currentMenu.children, sidebarSearch]);

  const selectedKeys = useMemo(() => {
    const match = flattenMenu(currentMenu.children).find((item) => location.pathname.startsWith(item.path));
    return match ? [match.path] : [];
  }, [currentMenu.children, location.pathname]);

  return (
    <Layout.Sider
      collapsible
      collapsed={sidebarCollapsed}
      width={310}
      collapsedWidth={88}
      theme="light"
      onCollapse={setSidebarCollapsed}
      className="!overflow-hidden border-r border-slate-200"
    >
      <div className="flex h-full flex-col bg-white">
        <div className="border-b border-slate-200 px-4 py-4">
          <div className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-brand-primary">
            {currentMenu.label}
          </div>
          {!sidebarCollapsed ? (
            <Input
              allowClear
              prefix={<Search size={16} className="text-slate-400" />}
              placeholder="Tìm kiếm menu"
              value={sidebarSearch}
              onChange={(event) => setSidebarSearch(event.target.value)}
            />
          ) : null}
        </div>

        <div className="enterprise-scrollbar flex-1 overflow-y-auto py-3">
          <Menu
            mode="inline"
            selectedKeys={selectedKeys}
            items={mapMenuItems(filteredChildren)}
            onClick={({ key }) => navigate(String(key))}
          />
        </div>
      </div>
    </Layout.Sider>
  );
}
