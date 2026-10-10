import { imageUrl } from '../../../api/images';
import { XIcon } from '../../../components/icons';
import type { BurgerLayer as BurgerLayerData } from '../../../types/burger';
import { formatLabel } from '../utils';
import './BurgerLayer.css';

const LAYER_SHAPE: Record<string, { width: string; overlap: string }> = {
  'burger-patty': { width: '93%', overlap: '-10%' },
  bacon: { width: '93%', overlap: '-12%' },
  egg: { width: '93%', overlap: '-15%' },
};
const DEFAULT_SHAPE = { width: '90%', overlap: '-10%' };

interface BurgerLayerProps {
  layer: BurgerLayerData;
  animate: boolean;
  /** Without it the layer is a plain image: not clickable, no hover "×" */
  onRemove?: (uid: string) => void;
}

export function BurgerLayer({ layer, animate, onRemove }: BurgerLayerProps) {
  const shape = LAYER_SHAPE[layer.name] ?? DEFAULT_SHAPE;
  const label = formatLabel(layer.name).toLowerCase();

  const image = (
    <img
      className="burger-layer__image"
      src={imageUrl(layer.src)}
      alt={label}
      draggable={false}
      style={{ width: shape.width }}
    />
  );

  return (
    <li className="burger-layer" style={{ marginBottom: shape.overlap }}>
      {onRemove ? (
        <button
          type="button"
          className={`burger-layer__button${animate ? ' burger-layer__button--new' : ''}`}
          onClick={() => onRemove(layer.uid)}
          title={`Click to remove ${label}`}
        >
          {image}
          <span className="burger-layer__remove">
            <XIcon size={14} />
          </span>
        </button>
      ) : (
        image
      )}
    </li>
  );
}
