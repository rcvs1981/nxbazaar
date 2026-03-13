export function convertIsoDatetoNormal(iso: string | Date): string {
  const date = new Date(iso);

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}