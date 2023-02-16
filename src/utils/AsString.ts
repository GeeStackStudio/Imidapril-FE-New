export function AsString(v?: number | null): string | undefined {
  if (v === null || v === undefined) {
    return undefined;
  }
  return v as unknown as string;
}
