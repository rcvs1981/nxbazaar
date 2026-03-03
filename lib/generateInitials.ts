export function generateInitials(name?: string): string {
  if (!name) return "AD"; // fallback → Admin

  const words = name.trim().split(" ");

  const firstInitial = words[0]?.[0]?.toUpperCase() ?? "";

  const secondInitial =
    words.length > 1 ? words[1]?.[0]?.toUpperCase() ?? "" : "";

  return firstInitial + secondInitial;
}
