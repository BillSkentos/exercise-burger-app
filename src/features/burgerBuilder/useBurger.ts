import { useSessionStorage } from 'usehooks-ts';
import type { BurgerLayer } from '../../types/burger';
import type { Ingredient } from '../../types/ingredient';
import { getBurgerSummary } from './utils';

const STORAGE_KEY = 'burger-builder.burger';

/** Most fillings a burger can hold (buns not included) */
export const MAX_LAYERS = 6;

const EMPTY_BURGER: BurgerLayer[] = [];

export function useBurger() {
  const [layers, setLayers] = useSessionStorage<BurgerLayer[]>(
    STORAGE_KEY,
    EMPTY_BURGER
  );

  function addLayer({ id, name, src }: Ingredient) {
    const layer: BurgerLayer = {
      uid: crypto.randomUUID(),
      ingredientId: id,
      name,
      src,
    };
    // Ignore adds past the limit, even if a caller forgets to check isFull
    setLayers((current) =>
      current.length >= MAX_LAYERS ? current : [...current, layer]
    );
  }

  function removeLayer(uid: string) {
    setLayers((current) => current.filter((layer) => layer.uid !== uid));
  }

  function undo() {
    setLayers((current) => current.slice(0, -1));
  }

  function clear() {
    setLayers([]);
  }

  const count = layers.length;

  const countById: Record<number, number> = {};
  for (const layer of layers) {
    countById[layer.ingredientId] = (countById[layer.ingredientId] ?? 0) + 1;
  }

  return {
    layers,
    count,
    isFull: count >= MAX_LAYERS,
    countById,
    summary: getBurgerSummary(layers, countById),
    addLayer,
    removeLayer,
    undo,
    clear,
  };
}
