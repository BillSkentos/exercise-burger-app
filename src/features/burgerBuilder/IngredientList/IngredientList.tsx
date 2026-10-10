import { Skeleton } from '../../../components/Skeleton';
import type { Ingredient } from '../../../types/ingredient';
import { MAX_LAYERS, useBurger } from '../useBurger';
import { useIngredients, type IngredientsStatus } from '../useIngredients';
import { IngredientCard } from './IngredientCard';
import './IngredientList.css';

const SKELETON_COUNT = 3;

interface IngredientListViewProps {
  ingredients: Ingredient[];
  status: IngredientsStatus;
  countById: Record<number, number>;
  /** Burger has MAX_LAYERS fillings: cards are disabled */
  isFull: boolean;
  onAdd: (ingredient: Ingredient) => void;
}

export function IngredientList({
  ingredients,
  status,
  countById,
  isFull,
  onAdd,
}: IngredientListViewProps) {
  return (
    <section className="ingredient-list">
      <div>
        <h2 className="display ingredient-list__title">Ingredients</h2>
        <p className="ingredient-list__hint">
          Click an ingredient to add it on top. Up to {MAX_LAYERS} layers per
          burger.
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
              disabled={isFull}
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
  const { addLayer, countById, isFull } = useBurger();

  return (
    <IngredientList
      ingredients={ingredients}
      status={status}
      countById={countById}
      isFull={isFull}
      onAdd={addLayer}
    />
  );
}
