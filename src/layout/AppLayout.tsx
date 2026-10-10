import { Outlet } from 'react-router';
import { NavBar } from '../components/NavBar';
import { useSession } from '../features/auth/useSession';
import { useBurger } from '../features/burgerBuilder/useBurger';
import { clearFetchCache } from '../hooks/useFetch';

export function AppLayout() {
  const { session, endSession } = useSession();
  const { clear } = useBurger();

  function handleLogout() {
    clear();
    clearFetchCache();
    endSession();
  }

  if (!session) return null;

  return (
    <>
      <NavBar expiresAt={session.expiresAt} onLogout={handleLogout} />
      <Outlet />
    </>
  );
}
