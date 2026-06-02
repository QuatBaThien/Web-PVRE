import { useEffect, useMemo } from 'react';
import { Button, Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import { ChevronDown } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { findTopMenuByPath, topMenus } from '../../config/menuConfig';
import { useAppStore } from '../../store/appStore';

function resolveTopMenuKey(pathname: string): string {
  return findTopMenuByPath(pathname).key;
}

export function TopMenuBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const activeTopMenuKey = useAppStore((state) => state.activeTopMenuKey);
  const setActiveTopMenu = useAppStore((state) => state.setActiveTopMenu);

  const resolvedActiveKey = useMemo(() => resolveTopMenuKey(location.pathname), [location.pathname]);

  useEffect(() => {
    if (resolvedActiveKey !== activeTopMenuKey) {
      setActiveTopMenu(resolvedActiveKey);
    }
  }, [activeTopMenuKey, resolvedActiveKey, setActiveTopMenu]);

  return (
    <div className="w-full overflow-x-auto enterprise-scrollbar">
      <div className="flex min-w-max items-center gap-2 rounded-2xl bg-slate-100 p-1.5 xl:min-w-0 xl:w-full">
        {topMenus.map((menu) => {
          const active = resolvedActiveKey === menu.key;
          const items: MenuProps['items'] = menu.children.map((item) => ({
            key: item.path,
            label: item.label,
            icon: item.icon ? <item.icon size={16} /> : undefined,
          }));

          return (
            <div key={menu.key} className="xl:flex-1">
              <Dropdown
                trigger={['click']}
                menu={{
                  items,
                  onClick: ({ key }) => {
                    setActiveTopMenu(menu.key);
                    navigate(String(key));
                  },
                }}
              >
                <Button
                  type="text"
                  className={`!relative !flex !h-auto !items-center !gap-2 !rounded-xl !px-4 !py-3 !text-sm !font-semibold !shadow-none transition xl:!w-full xl:!justify-center ${
                    active
                      ? '!bg-white !text-brand-primary shadow-sm'
                      : '!text-slate-600 hover:!bg-white/80 hover:!text-brand-secondary'
                  }`}
                  onClick={() => setActiveTopMenu(menu.key)}
                >
                  <span>{menu.label}</span>
                  <ChevronDown size={16} className={active ? 'text-brand-primary' : 'text-slate-400'} />
                  <span
                    className={`absolute inset-x-3 bottom-1 h-0.5 rounded-full transition ${
                      active ? 'bg-brand-primary' : 'bg-transparent'
                    }`}
                  />
                </Button>
              </Dropdown>
            </div>
          );
        })}
      </div>
    </div>
  );
}
