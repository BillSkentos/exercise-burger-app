import { Button } from '../Button';
import { BurgerIcon, LogoutIcon } from '../icons';
import { SessionTimer } from '../SessionTimer';
import './NavBar.css';

interface NavBarProps {
  expiresAt: number;
  onLogout: () => void;
}

export function NavBar({ expiresAt, onLogout }: NavBarProps) {
  return (
    <header className="navbar">
      <div className="navbar__brand">
        <span className="navbar__logo">
          <BurgerIcon />
        </span>
        <span className="display navbar__wordmark">Burger Builder</span>
      </div>

      <div className="navbar__actions">
        <SessionTimer expiresAt={expiresAt} />
        <Button variant="on-dark" className="navbar__logout" onClick={onLogout}>
          <LogoutIcon size={16} />
          <span>Log out</span>
        </Button>
      </div>
    </header>
  );
}
