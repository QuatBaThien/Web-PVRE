import { useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { topMenus } from '../../config/menuConfig';
import { useAppStore } from '../../store/appStore';

function resolveTopMenuKey(pathname: string): string {
  const match = topMenus.find((menu) => menu.children.some((item) => pathname.startsWith(item.path)));
  if (match) {
    return match.key;
  }
  if (pathname.startsWith('/reinsurance')) {
    return 'reinsurance';
  }
  return 'reinsurance';
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
    <div className="overflow-x-auto enterprise-scrollbar">
      <div className="flex min-w-max items-center gap-2 rounded-2xl bg-slate-100 p-1.5">
        {topMenus.map((menu) => {
          const active = resolvedActiveKey === menu.key;
          return (
            <button
              key={menu.key}
              type="button"
              className={`relative rounded-xl px-4 py-3 text-sm font-semibold transition ${
                active ? 'bg-white text-brand-primary shadow-sm' : 'text-slate-600 hover:bg-white/80 hover:text-brand-secondary'
              }`}
              onClick={() => {
                setActiveTopMenu(menu.key);
                navigate(menu.children[0]?.path ?? '/');
              }}
            >
              {menu.label}
              <span
                className={`absolute inset-x-3 bottom-1 h-0.5 rounded-full transition ${
                  active ? 'bg-brand-primary' : 'bg-transparent'
                }`}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
