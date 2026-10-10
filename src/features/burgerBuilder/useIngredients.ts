import { useCallback } from 'react';
import { UnauthorizedError } from '../../api/client';
import { getIngredients } from '../../api/ingredients';
import { useFetch } from '../../hooks/useFetch';
import type { Ingredient } from '../../types/ingredient';
import { useSession } from '../auth/useSession';
import { isBun } from './utils';

export type IngredientsStatus = 'loading' | 'error' | 'success';

// Loads the pickable ingredients (everything except the buns)
export function useIngredients() {
  const { token, endSession } = useSession();

  const fetchIngredients = useCallback(async (): Promise<Ingredient[]> => {
    try {
      if (!token) throw new UnauthorizedError();
      const ingredients = await getIngredients(token);
      return ingredients.filter((ingredient) => !isBun(ingredient.name));
    } catch (error) {
      // Expired or invalid token: sign out, ProtectedRoute redirects to /login
      if (error instanceof UnauthorizedError) endSession();
      throw error;
    }
  }, [token, endSession]);

  const { data, error, loading } = useFetch('ingredients', fetchIngredients);

  const status: IngredientsStatus = loading
    ? 'loading'
    : error
      ? 'error'
      : 'success';

  return { ingredients: data ?? [], status };
}
