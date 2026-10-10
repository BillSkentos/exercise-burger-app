import BurgerPanelConnected from './BurgerPanel';
import IngredientListConnected from './IngredientList';
import './BurgerBuilderPage.css';

export function BurgerBuilderPage() {
  return (
    <main className="burger-builder">
      <div className="burger-builder__ingredients">
        <IngredientListConnected />
      </div>

      <div className="burger-builder__burger">
        <BurgerPanelConnected />
      </div>
    </main>
  );
}
