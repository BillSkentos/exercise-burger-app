import { useNavigate } from 'react-router';
import { Button } from '../../components/Button';
import type { PurchaseState } from '../order/purchase';
import BurgerPreviewConnected from './BurgerPreview';
import IngredientListConnected from './IngredientList';
import './BurgerBuilderPage.css';

export function BurgerBuilderPage() {
  const navigate = useNavigate();

  function handleBuy() {
    const state: PurchaseState = { purchased: true };
    navigate('/success', { state });
  }

  return (
    <main className="burger-builder">
      <div className="burger-builder__ingredients">
        <IngredientListConnected />
      </div>

      <div className="burger-builder__burger">
        <BurgerPreviewConnected />
        <Button onClick={handleBuy}>Buy burger</Button>
      </div>
    </main>
  );
}
