import type { LoginResponse, Session } from '../../types/auth';

const DEFAULT_DURATION_MS = 10 * 60 * 1000;

const UNIT_MS: Record<string, number> = {
  s: 1000,
  m: 60 * 1000,
  h: 60 * 60 * 1000,
  d: 24 * 60 * 60 * 1000,
};

// Turns the API's "expiresIn" (e.g. "10m", "30s", "1h") into milliseconds
function parseDuration(expiresIn: string): number {
  const match = /^(\d+)\s*([smhd])$/.exec(expiresIn.trim());
  if (!match) return DEFAULT_DURATION_MS;
  return Number(match[1]) * UNIT_MS[match[2]];
}

export function createSession({ token, expiresIn }: LoginResponse): Session {
  return { token, expiresAt: Date.now() + parseDuration(expiresIn) };
}
