import { createBrowserRouter, Navigate } from 'react-router';
import { LoginPage } from '../features/auth/LoginPage';
import { BurgerBuilderPage } from '../features/burgerBuilder/BurgerBuilderPage';
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
      { path: '/', element: <BurgerBuilderPage /> },
      { path: '/success', element: <SuccessPage /> },
    ],
  },
  { path: '*', element: <Navigate to="/" replace /> },
]);
