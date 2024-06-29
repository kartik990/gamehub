export function deepCopy(arr: any[] | null): any[] | null {
  if (!Array.isArray(arr)) {
    return arr;
  }

  return arr.map((item: any) => deepCopy(item));
}
