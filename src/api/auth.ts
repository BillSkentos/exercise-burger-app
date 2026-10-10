import { API_URL } from './config';
import type { LoginCredentials, LoginResponse } from '../types/auth';

export class InvalidCredentialsError extends Error {
  constructor() {
    super('Invalid credentials');
    this.name = 'InvalidCredentialsError';
  }
}

export async function login(
  credentials: LoginCredentials
): Promise<LoginResponse> {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });

  if (response.status === 401) {
    throw new InvalidCredentialsError();
  }
  if (!response.ok) {
    throw new Error(`Login failed with status ${response.status}`);
  }

  return (await response.json()) as LoginResponse;
}
