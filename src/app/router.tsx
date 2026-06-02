import { createBrowserRouter, Navigate } from 'react-router-dom';
import { App } from './App';
import { InwardContractList } from '../pages/reinsurance/InwardContractList';
import { InwardContractDetail } from '../pages/reinsurance/InwardContractDetail';
import { PlaceholderPage } from '../pages/placeholder/PlaceholderPage';

const basePath = import.meta.env.BASE_URL.replace(/\/$/, '');

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to="/reinsurance/inward-contracts" replace />,
      },
      {
        path: '/reinsurance/inward-contracts',
        element: <InwardContractList />,
      },
      {
        path: '/reinsurance/inward-contracts/:id',
        element: <InwardContractDetail />,
      },
      {
        path: '/placeholder/:module/:function',
        element: <PlaceholderPage />,
      },
    ],
  },
], {
  basename: basePath,
});
