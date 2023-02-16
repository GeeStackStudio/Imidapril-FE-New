export function ToNumber(v?: string | null) {
  if (v === null || v === undefined) {
    return undefined;
  }
  return Number(v);
}
