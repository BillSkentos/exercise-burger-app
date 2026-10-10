import { useEffect } from 'react';
import { useSessionStorage } from 'usehooks-ts';
import type { LoginResponse, Session } from '../../types/auth';
import { createSession } from './session';

const STORAGE_KEY = 'burger-builder.session';

export function useSession() {
  const [session, setSession, removeSession] =
    useSessionStorage<Session | null>(STORAGE_KEY, null);

  useEffect(() => {
    if (!session) return;

    const timeout = setTimeout(removeSession, session.expiresAt - Date.now());
    return () => clearTimeout(timeout);
  }, [session, removeSession]);

  return {
    session,
    token: session?.token ?? null,
    startSession: (response: LoginResponse) =>
      setSession(createSession(response)),
    endSession: removeSession,
  };
}
