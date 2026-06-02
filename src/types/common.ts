import type { ReactNode } from 'react';

export interface BreadcrumbItem {
  key: string;
  title: string;
  path?: string;
}

export interface SelectOption {
  label: string;
  value: string;
}

export interface DrawerPreviewItem {
  label: string;
  value: ReactNode;
}
