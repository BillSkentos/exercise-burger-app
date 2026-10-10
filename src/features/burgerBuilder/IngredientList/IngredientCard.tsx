import { imageUrl } from '../../../api/images';
import { Badge } from '../../../components/Badge';
import { PlusIcon } from '../../../components/icons';
import type { Ingredient } from '../../../types/ingredient';
import { formatLabel } from '../utils';
import './IngredientCard.css';

interface IngredientCardProps {
  ingredient: Ingredient;
  count: number;
  onAdd: (ingredient: Ingredient) => void;
}

export function IngredientCard({
  ingredient,
  count,
  onAdd,
}: IngredientCardProps) {
  return (
    <button
      type="button"
      className="ingredient-card"
      onClick={() => onAdd(ingredient)}
    >
      <span className="ingredient-card__thumb">
        <img src={imageUrl(ingredient.src)} alt="" />
      </span>
      <span className="ingredient-card__text">
        <span className="ingredient-card__name">
          {formatLabel(ingredient.name)}
        </span>
        <span className="ingredient-card__src">{ingredient.src}</span>
      </span>
      {count > 0 && <Badge>×{count}</Badge>}
      <PlusIcon className="ingredient-card__plus" />
    </button>
  );
}
