import { createBrowserRouter, Navigate } from 'react-router';
import { LoginPage } from '../features/auth/LoginPage';
import { BuilderPage } from '../features/builder/BuilderPage';
import { SuccessPage } from '../features/order/SuccessPage';
import { ProtectedRoute } from './ProtectedRoute';
import { PublicOnlyRoute } from './PublicOnlyRoute';

export const router = createBrowserRouter([
  {
    element: <PublicOnlyRoute />,
    children: [{ path: '/login', element: <LoginPage /> }],
  },
  {
    element: <ProtectedRoute />,
    children: [
      { path: '/', element: <BuilderPage /> },
      { path: '/success', element: <SuccessPage /> },
    ],
  },
  { path: '*', element: <Navigate to="/" replace /> },
]);
