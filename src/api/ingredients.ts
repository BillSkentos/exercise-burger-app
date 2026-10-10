import { request } from './client';
import type { Ingredient } from '../types/ingredient';

// Throws UnauthorizedError when the token is missing, invalid or expired
export function getIngredients(token: string): Promise<Ingredient[]> {
  return request<Ingredient[]>('/ingredients', { token });
}
