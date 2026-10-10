import { Navigate, useLocation, useNavigate } from 'react-router';
import { Button } from '../../components/Button/Button';
import { isPurchaseState } from './purchase';

export function SuccessPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // Only reachable right after buying; opened directly, go back to the builder
  if (!isPurchaseState(location.state)) {
    return <Navigate to="/" replace />;
  }

  return (
    <main>
      <h1 className="display">Burger bought!</h1>
      <p>Thanks for your order. Fancy another?</p>
      <Button onClick={() => navigate('/', { replace: true })}>
        Buy one more
      </Button>
    </main>
  );
}
