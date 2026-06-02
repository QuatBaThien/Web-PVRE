import type { LucideIcon } from 'lucide-react';

export interface MenuItemConfig {
  key: string;
  label: string;
  path: string;
  icon?: LucideIcon;
  children?: MenuItemConfig[];
}

export interface TopMenuConfig {
  key: string;
  label: string;
  children: MenuItemConfig[];
}
