export function UseZebra(row: any, index: number) {
  if (index % 2 === 1) {
    return "zebra-highlight";
  }
  return "";
}
