export function generateIsoFormattedDate(date: Date = new Date()): string {
  return date.toISOString();
}