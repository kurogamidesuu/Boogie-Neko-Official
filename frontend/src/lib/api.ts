import { User } from "@/store/use-auth";
import { components } from "@/types/api";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type Image = {
  id: number,
  url: string,
  altText?: string,
}

export type Product = components["schemas"]["CreateProductDto"] & {
  id: number;
  images: Image;
};
export type loginCredentials = components["schemas"]["LoginDto"];
export type registerCredentials = components["schemas"]["CreateUserDto"];
export type AuthUser = {
  id: number;
  email: string;
  name: string;
  role: "USER" | "ADMIN";
}

export async function loginUser(credentials: loginCredentials): Promise<{access_token: string, user: AuthUser}> {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Login failed');
  }
  return data;
}

export async function registerUser(credentials: registerCredentials): Promise<User> {
  const res = await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Failed to Sign up');
  }
  return data;
}

export async function fetchProducts(): Promise<Product[]> {

  const res = await fetch(`${API_URL}/products`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }

  const data = await res.json();

  return data.data;
}