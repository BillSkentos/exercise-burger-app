import type { BurgerLayer } from '../../types/burger';

/**
 * Turns a snake_case or kebab-case identifier into a readable label:
 * separators become spaces and only the first letter is capitalised.
 *
 * @param value - Identifier such as an API name, e.g. `"burger-patty"`.
 * @returns The label, e.g. `"Burger patty"`; `"bun_top"` becomes `"Bun top"`.
 */
export function formatLabel(value: string): string {
  const words = value.replace(/[-_]+/g, ' ').trim();
  return words.charAt(0).toUpperCase() + words.slice(1);
}

/**
 * Tells whether an API ingredient is a bun. Buns always frame the burger,
 * so they are left out of the ingredient picker.
 *
 * @param name - The ingredient's API name, e.g. `"bun_top"` or `"bacon"`.
 * @returns `true` for names starting with `"bun"`.
 */
export function isBun(name: string): boolean {
  return name.startsWith('bun');
}

/**
 * Describes a burger's fillings in one line for the "Your burger" header.
 * Ingredients are listed by id rather than insertion order, so the text
 * doesn't reshuffle as layers are added.
 *
 * @param layers - The burger's layers, in any order.
 * @param countById - How many layers each ingredient id has.
 * @returns `"3 layers · 2 bacon, 1 egg"`, or `"Just the buns so far."` when empty.
 */
export function getBurgerSummary(
  layers: BurgerLayer[],
  countById: Record<number, number>
): string {
  if (layers.length === 0) return 'Just the buns so far.';

  const names = new Map<number, string>();
  for (const layer of layers) names.set(layer.ingredientId, layer.name);

  const parts = [...names.entries()]
    .sort(([a], [b]) => a - b)
    .map(([id, name]) => `${countById[id]} ${formatLabel(name).toLowerCase()}`);

  const noun = layers.length === 1 ? 'layer' : 'layers';
  return `${layers.length} ${noun} · ${parts.join(', ')}`;
}
