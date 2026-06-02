import { create } from 'zustand';
import { topMenus } from '../config/menuConfig';

interface AppState {
  activeTopMenuKey: string;
  sidebarCollapsed: boolean;
  sidebarSearch: string;
  workingYear: number;
  setActiveTopMenu: (key: string) => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  setSidebarSearch: (search: string) => void;
  setWorkingYear: (year: number) => void;
}

export const useAppStore = create<AppState>((set) => ({
  activeTopMenuKey: topMenus[3]?.key ?? 'reinsurance',
  sidebarCollapsed: false,
  sidebarSearch: '',
  workingYear: 2026,
  setActiveTopMenu: (key) => set({ activeTopMenuKey: key }),
  setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
  setSidebarSearch: (search) => set({ sidebarSearch: search }),
  setWorkingYear: (year) => set({ workingYear: year }),
}));
