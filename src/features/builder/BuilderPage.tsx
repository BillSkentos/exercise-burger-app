import { useNavigate } from 'react-router';
import { Button } from '../../components/Button/Button';
import type { PurchaseState } from '../order/purchase';

// Placeholder until the ingredient list and burger stack are built
export function BuilderPage() {
  const navigate = useNavigate();

  function handleBuy() {
    const state: PurchaseState = { purchased: true };
    navigate('/success', { state });
  }

  return (
    <main>
      <h1 className="display">Burger builder</h1>
      <Button onClick={handleBuy}>Buy burger</Button>
    </main>
  );
}
