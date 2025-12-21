import { components } from "@/types/api";

export type Product = components["schemas"]["CreateProductDto"];

export async function fetchProducts(): Promise<Product[]> {
  const url = process.env.NEXT_PUBLIC_API_URL;

  const res = await fetch(`${url}/products`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }

  const data = await res.json();

  return data.data;
}