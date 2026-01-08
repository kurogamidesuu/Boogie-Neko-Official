import { useAuth, User } from "@/store/use-auth";
import { CartItem } from "@/store/use-cart";
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
export type Address = components['schemas']['CreateAddressDto'] & {
  id?: number;
};
export type AddToCartDto = components['schemas']['AddToCartDto'];
export type RemoveFromCartDto = components['schemas']['RemoveFromCartDto'];
export type Cart = {
  id: number;
  userId: number;
  items: ({
    id: number;
    quantity: number;
    cartId: number;
    productId: number;
    product: Product;
  })[];
}

async function handleResponse(res: Response) {
  if (res.status === 401) {
    useAuth.getState().logout();
    throw new Error("Session expired!");
  }

  if (!res.ok) {
    const errData = await res.json()
    throw new Error(errData.message || 'Something went wrong!')
  }

  return res.json();
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

const getAuthHeaders = () => {
  const token = useAuth.getState().token;
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };
};

export async function fetchAddresses(): Promise<Address[]> {
  const res = await fetch(`${API_URL}/addresses`, {
    method: 'GET',
    headers: getAuthHeaders(),
    cache: 'no-store',
  });

  return handleResponse(res);
}

export async function createAddress(data: Address): Promise<Address> {
  const res = await fetch(`${API_URL}/addresses`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });

  return handleResponse(res);
}

export async function changeDefault(id: number): Promise<Address> {
  const res = await fetch(`${API_URL}/addresses`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify({ id }),
  });

  return handleResponse(res);
}

export async function addToCart(addToCartDto: AddToCartDto) {
  const res = await fetch(`${API_URL}/cart`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(addToCartDto),
  });

  return handleResponse(res);
}

export async function removeFromCart(removeFromCartDto: RemoveFromCartDto): Promise<CartItem[]> {
  const res = await fetch(`${API_URL}/cart`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(removeFromCartDto),
  });

  return handleResponse(res);
}

export async function getCart(): Promise<Cart> {
  const res = await fetch(`${API_URL}/cart`, {
    method: 'GET',
    headers: getAuthHeaders(),
  });

  return handleResponse(res);
}