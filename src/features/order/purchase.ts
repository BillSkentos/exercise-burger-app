export interface PurchaseState {
  purchased: true;
}

export function isPurchaseState(state: unknown): state is PurchaseState {
  return (
    typeof state === 'object' &&
    state !== null &&
    (state as PurchaseState).purchased === true
  );
}
