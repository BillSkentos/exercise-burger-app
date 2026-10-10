import { useSessionStorage } from 'usehooks-ts';
import type { BurgerLayer } from '../../types/burger';
import type { Ingredient } from '../../types/ingredient';
import { getBurgerSummary } from './utils';

const STORAGE_KEY = 'burger-builder.burger';

// Shared so usehooks-ts sees the same initial value on every render
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
    setLayers((current) => [...current, layer]);
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
    countById,
    summary: getBurgerSummary(layers, countById),
    addLayer,
    removeLayer,
    undo,
    clear,
  };
}
