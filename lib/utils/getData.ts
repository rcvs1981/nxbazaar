import { headers } from "next/headers";

export async function getData<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {

  const host = (await headers()).get("host");
  const protocol = process.env.NODE_ENV === "production"
    ? "https"
    : "http";

  const baseUrl = `${protocol}://${host}`;

  const res = await fetch(
    `${baseUrl}/api/${endpoint}`,
    {
      cache: "no-store",
      ...options,
    }
  );

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(
      `API Error: ${res.status} - ${errorText}`
    );
  }

  return (await res.json()) as T;
}