import type { ReactNode } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../../../components/Button';
import { BagIcon, TrashIcon, UndoIcon } from '../../../components/icons';
import type { PurchaseState } from '../../order/purchase';
import BurgerPreviewConnected from '../BurgerPreview';
import { useBurger } from '../useBurger';
import './BurgerPanel.css';

interface BurgerPanelProps {
  summary: string;
  count: number;
  isFull: boolean;
  preview: ReactNode;
  onUndo: () => void;
  onClear: () => void;
  onBuy: () => void;
}

export function BurgerPanel({
  summary,
  count,
  isFull,
  preview,
  onUndo,
  onClear,
  onBuy,
}: BurgerPanelProps) {
  const isEmpty = count === 0;

  return (
    <section className="burger-panel">
      <div className="burger-panel__header">
        <div>
          <h2 className="display burger-panel__title">Your burger</h2>
          {isFull ? (
            <p className="burger-panel__summary burger-panel__summary--full">
              Your burger is full.
            </p>
          ) : (
            <p className="burger-panel__summary">{summary}</p>
          )}
        </div>

        <div className="burger-panel__actions">
          <Button
            variant="ghost"
            className="burger-panel__action"
            onClick={onUndo}
            disabled={isEmpty}
          >
            <UndoIcon size={16} />
            <span>Undo last</span>
          </Button>
          <Button
            variant="ghost"
            className="burger-panel__action"
            onClick={onClear}
            disabled={isEmpty}
          >
            <TrashIcon size={16} />
            <span>Clear</span>
          </Button>
        </div>
      </div>

      {preview}

      <Button
        fullWidth
        className="burger-panel__buy"
        onClick={onBuy}
        disabled={isEmpty}
      >
        <BagIcon size={18} />
        <span>Buy burger</span>
      </Button>

      <p className="burger-panel__hint">
        Click any layer in the burger to remove it. New ingredients land on top.
      </p>
    </section>
  );
}

// Connected: reads the burger from useBurger and handles buying
export default function BurgerPanelConnected() {
  const { summary, count, isFull, undo, clear } = useBurger();
  const navigate = useNavigate();

  function handleBuy() {
    const state: PurchaseState = { purchased: true };
    navigate('/success', { state });
  }

  return (
    <BurgerPanel
      summary={summary}
      count={count}
      isFull={isFull}
      preview={<BurgerPreviewConnected />}
      onUndo={undo}
      onClear={clear}
      onBuy={handleBuy}
    />
  );
}
