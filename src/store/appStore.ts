import { create } from 'zustand';
import { topMenus } from '../config/menuConfig';

interface AppState {
  activeTopMenuKey: string;
  sidebarCollapsed: boolean;
  sidebarPreviewExpanded: boolean;
  workingYear: number;
  setActiveTopMenu: (key: string) => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  setSidebarPreviewExpanded: (expanded: boolean) => void;
  setWorkingYear: (year: number) => void;
}

export const useAppStore = create<AppState>((set) => ({
  activeTopMenuKey: topMenus[3]?.key ?? 'reinsurance',
  sidebarCollapsed: false,
  sidebarPreviewExpanded: false,
  workingYear: 2026,
  setActiveTopMenu: (key) => set({ activeTopMenuKey: key }),
  setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed, sidebarPreviewExpanded: false }),
  setSidebarPreviewExpanded: (expanded) => set({ sidebarPreviewExpanded: expanded }),
  setWorkingYear: (year) => set({ workingYear: year }),
}));
