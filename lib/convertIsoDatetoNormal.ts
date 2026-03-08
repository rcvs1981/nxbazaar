export function convertIsoDatetoNormal(iso: string): string {
  const date = new Date(iso);
  return date.toLocaleDateString();
}