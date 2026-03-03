const PRINTFUL_API_BASE = "https://api.printful.com";

export async function printfulFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const token = process.env.PRINTFUL_API_KEY;
  if (!token) throw new Error("Missing PRINTFUL_API_KEY");

  const res = await fetch(`${PRINTFUL_API_BASE}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...(init?.headers ?? {})
    },
    cache: "no-store"
  });

  if (!res.ok) throw new Error(`Printful request failed: ${res.status}`);
  return res.json() as Promise<T>;
}

export type PrintfulSyncProduct = {
  id: number;
  external_id: string | null;
  name: string;
  thumbnail_url: string;
  variants: Array<{
    id: number;
    external_id: string | null;
    sku: string;
    name: string;
    price: string;
    currency: string;
  }>;
};
