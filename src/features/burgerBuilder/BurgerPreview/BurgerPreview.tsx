import { useState } from 'react';
import { imageUrl } from '../../../api/images';
import type { BurgerLayer as BurgerLayerData } from '../../../types/burger';
import { useBurger } from '../useBurger';
import { BurgerLayer } from './BurgerLayer';
import './BurgerPreview.css';

interface BurgerPreviewProps {
  layers: BurgerLayerData[];
  initialUids: Set<string>;
  onRemove: (uid: string) => void;
}

export function BurgerPreview({
  layers,
  initialUids,
  onRemove,
}: BurgerPreviewProps) {
  return (
    <div className="burger-preview">
      <div className="burger-preview__stack">
        <img
          className="burger-preview__bun burger-preview__bun--top"
          src={imageUrl('bun_top.png')}
          alt=""
          draggable={false}
        />

        {layers.length === 0 && (
          <div className="burger-preview__empty">Add ingredients to start</div>
        )}
        <ol className="burger-preview__layers">
          {layers.map((layer) => (
            <BurgerLayer
              key={layer.uid}
              layer={layer}
              animate={!initialUids.has(layer.uid)}
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
