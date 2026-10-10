export interface BurgerLayer {
  /** Unique per layer, so duplicates can be removed one at a time */
  uid: string;
  ingredientId: number;
  name: string;
  src: string;
}
