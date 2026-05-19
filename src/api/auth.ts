import type { UserRole } from '../utils/validation';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  role: UserRole;
  createdAt: string;
}

export interface RegisterPayload {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
  role: UserRole;
}

async function parseResponse<T>(res: Response): Promise<T> {
  const data = await res.json();
  if (!res.ok) {
    const err = new Error('request_failed') as Error & { errors?: Record<string, string> };
    err.errors = data.errors;
    throw err;
  }
  return data as T;
}

export async function registerUser(payload: RegisterPayload): Promise<{ user: User; message: string }> {
  const res = await fetch('/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return parseResponse(res);
}

export async function loginUser(email: string, password: string): Promise<{ user: User; message: string }> {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return parseResponse(res);
}
