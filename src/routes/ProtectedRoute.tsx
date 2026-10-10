import { Navigate, Outlet } from 'react-router';
import { useSession } from '../features/auth/useSession';

// Only signed-in users get through; everyone else goes to /login
export function ProtectedRoute() {
  const { session } = useSession();

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
