import { request, UnauthorizedError } from './client';
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
  try {
    return await request<LoginResponse>('/login', {
      method: 'POST',
      body: credentials,
    });
  } catch (error) {
    if (error instanceof UnauthorizedError) throw new InvalidCredentialsError();
    throw error;
  }
}
