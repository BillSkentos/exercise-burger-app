import { useState } from 'react';
import { imageUrl } from '../../../api/images';
import type { BurgerLayer as BurgerLayerData } from '../../../types/burger';
import { useBurger } from '../useBurger';
import { BurgerLayer } from './BurgerLayer';
import './BurgerPreview.css';

interface BurgerPreviewProps {
  /** Fillings, oldest first; the last one is drawn just under the top bun */
  layers: BurgerLayerData[];
  /** Layers that were already there on mount, so they don't animate */
  initialUids?: Set<string>;
  /**
   * Makes each layer removable by clicking it. Without it the preview is
   * view-only: plain images, no animation and no yellow stage around them.
   */
  onRemove?: (uid: string) => void;
}

export function BurgerPreview({
  layers,
  initialUids,
  onRemove,
}: BurgerPreviewProps) {
  const viewOnly = !onRemove;

  return (
    <div
      className={`burger-preview${viewOnly ? ' burger-preview--view-only' : ''}`}
    >
      <div className="burger-preview__stack">
        <img
          className="burger-preview__bun burger-preview__bun--top"
          src={imageUrl('bun_top.png')}
          alt=""
          draggable={false}
        />

        {layers.length === 0 && (
          <div className="burger-preview__empty">Add ingredients</div>
        )}
        <ol className="burger-preview__layers">
          {layers.map((layer) => (
            <BurgerLayer
              key={layer.uid}
              layer={layer}
              animate={!viewOnly && !initialUids?.has(layer.uid)}
              onRemove={onRemove}
            />
          ))}
        </ol>
        <img
          className="burger-preview__bun burger-preview__bun--bottom"
          src={imageUrl('bun_bottom.png')}
          alt=""
          draggable={false}
        />
        <div className="burger-preview__shadow" />
      </div>
    </div>
  );
}

export default function BurgerPreviewConnected() {
  const { layers, removeLayer } = useBurger();
  const [initialUids] = useState(
    () => new Set(layers.map((layer) => layer.uid))
  );

  return (
    <BurgerPreview
      layers={layers}
      initialUids={initialUids}
      onRemove={removeLayer}
    />
  );
}
