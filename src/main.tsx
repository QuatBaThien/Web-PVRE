import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConfigProvider } from 'antd';
import viVN from 'antd/locale/vi_VN';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import { RouterProvider } from 'react-router-dom';
import { App as AntApp } from 'antd';
import { router } from './app/router';
import './styles.css';

dayjs.locale('vi');

const queryClient = new QueryClient();

const theme = {
  token: {
    colorPrimary: '#1A3C6E',
    colorInfo: '#0066CC',
    colorSuccess: '#28A745',
    colorWarning: '#FFC107',
    colorError: '#DC3545',
    colorBgLayout: '#F0F2F5',
    colorBgContainer: '#FFFFFF',
    borderRadius: 10,
    fontFamily: 'Inter, sans-serif',
  },
  components: {
    Layout: {
      headerBg: '#FFFFFF',
      siderBg: '#FFFFFF',
      bodyBg: '#F0F2F5',
      triggerBg: '#1A3C6E',
    },
    Table: {
      headerBg: '#1A3C6E',
      headerColor: '#FFFFFF',
      rowHoverBg: '#EEF4FF',
      borderColor: '#D8E2F0',
    },
    Menu: {
      itemSelectedColor: '#1A3C6E',
      itemSelectedBg: '#EAF2FF',
      itemHoverColor: '#0066CC',
      itemBorderRadius: 8,
    },
  },
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ConfigProvider locale={viVN} theme={theme}>
        <AntApp>
          <RouterProvider router={router} />
        </AntApp>
      </ConfigProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
