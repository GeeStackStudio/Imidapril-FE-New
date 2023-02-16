export function ToString(v?: number | null) {
  if (v === null || v === undefined) {
    return undefined;
  }
  return String(v);
}
