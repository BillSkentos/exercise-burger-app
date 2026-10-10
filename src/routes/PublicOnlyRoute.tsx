import { Navigate, Outlet } from 'react-router';
import { useSession } from '../features/auth/useSession';

export function PublicOnlyRoute() {
  const { session } = useSession();

  if (session) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
