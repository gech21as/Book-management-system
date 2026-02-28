import { apiFetch } from './client';

export type AuthUser = { id: string; name: string; email: string; role?: string };

export async function registerApi(name: string, email: string, password: string) {
  return apiFetch('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify({ name, email, password }),
  });
}

export async function loginApi(email: string, password: string) {
  return apiFetch('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}
