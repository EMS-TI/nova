import { User } from '../types';

export function getCurrentUser(): User | null {
  const username = localStorage.getItem('currentUser');
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  if (!username || !isLoggedIn) {
    return null;
  }

  return { username, isLoggedIn };
}

export function login(username: string, password: string): boolean {
  const storedPassword = localStorage.getItem(username);

  if (storedPassword === password) {
    localStorage.setItem('currentUser', username);
    localStorage.setItem('isLoggedIn', 'true');
    return true;
  }

  return false;
}

export function logout(): void {
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('currentUser');
}

export function register(username: string, password: string): boolean {
  if (localStorage.getItem(username)) {
    return false;
  }

  localStorage.setItem(username, password);
  return true;
}