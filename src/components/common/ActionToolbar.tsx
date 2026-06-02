import { Button, Space } from 'antd';
import type { ReactNode } from 'react';

export interface ToolbarAction {
  key: string;
  label: string;
  icon?: ReactNode;
  type?: 'primary' | 'default';
  danger?: boolean;
  onClick?: () => void;
}

interface ActionToolbarProps {
  actions: ToolbarAction[];
}

export function ActionToolbar({ actions }: ActionToolbarProps) {
  return (
    <div className="rounded-2xl bg-white px-4 py-3 shadow-panel">
      <Space wrap>
        {actions.map((action) => (
          <Button
            key={action.key}
            type={action.type ?? 'default'}
            danger={action.danger}
            icon={action.icon}
            onClick={action.onClick}
          >
            {action.label}
          </Button>
        ))}
      </Space>
    </div>
  );
}
