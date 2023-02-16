export function AsNumber(v?: string | null): number | undefined {
  if (v === null || v === undefined) {
    return undefined;
  }
  return v as unknown as number;
}
