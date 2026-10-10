import { Skeleton } from '../../../components/Skeleton';
import type { Ingredient } from '../../../types/ingredient';
import { useBurger } from '../useBurger';
import { useIngredients, type IngredientsStatus } from '../useIngredients';
import { IngredientCard } from './IngredientCard';
import './IngredientList.css';

const SKELETON_COUNT = 3;

interface IngredientListViewProps {
  ingredients: Ingredient[];
  status: IngredientsStatus;
  countById: Record<number, number>;
  onAdd: (ingredient: Ingredient) => void;
}

export function IngredientList({
  ingredients,
  status,
  countById,
  onAdd,
}: IngredientListViewProps) {
  return (
    <section className="ingredient-list">
      <div>
        <h2 className="display ingredient-list__title">Ingredients</h2>
        <p className="ingredient-list__hint">
          Click an ingredient to add it on top. Add as many as you like.
        </p>
      </div>

      {status === 'loading' && (
        <div className="ingredient-list__items">
          {Array.from({ length: SKELETON_COUNT }, (_, index) => (
            <Skeleton key={index} height={68} />
          ))}
        </div>
      )}

      {status === 'error' && (
        <p className="ingredient-list__error">
          We couldn't load the ingredients. Please refresh the page.
        </p>
      )}

      {status === 'success' && (
        <div className="ingredient-list__items">
          {ingredients.map((ingredient) => (
            <IngredientCard
              key={ingredient.id}
              ingredient={ingredient}
              count={countById[ingredient.id] ?? 0}
              onAdd={onAdd}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default function IngredientListConnected() {
  const { ingredients, status } = useIngredients();
  const { addLayer, countById } = useBurger();

  return (
    <IngredientList
      ingredients={ingredients}
      status={status}
      countById={countById}
      onAdd={addLayer}
    />
  );
}
