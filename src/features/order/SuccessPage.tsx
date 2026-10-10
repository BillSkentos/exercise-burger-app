import { Navigate, useLocation, useNavigate } from 'react-router';
import { Button } from '../../components/Button';
import { CheckIcon, PlusIcon } from '../../components/icons';
import { BurgerPreview } from '../burgerBuilder/BurgerPreview';
import { useBurger } from '../burgerBuilder/useBurger';
import { isPurchaseState } from './purchase';
import './SuccessPage.css';

export function SuccessPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { layers, clear } = useBurger();

  // Only reachable right after buying; opened directly, go back to the builder
  if (!isPurchaseState(location.state)) {
    return <Navigate to="/" replace />;
  }

  // Start the next burger from scratch; replace so Back doesn't return here
  function handleBuyMore() {
    clear();
    navigate('/', { replace: true });
  }

  return (
    <main className="success">
      {/* The burger that was just bought; view-only since no onRemove */}
      <BurgerPreview layers={layers} />

      <div className="success__message">
        <span className="success__check">
          <CheckIcon size={22} />
        </span>
        <h1 className="display success__title">Burger bought!</h1>
        <p className="success__subtitle">
          Thanks for your order. Fancy another?
        </p>
      </div>

      <Button className="success__again" onClick={handleBuyMore}>
        <PlusIcon size={18} />
        <span>Buy one more</span>
      </Button>
    </main>
  );
}
