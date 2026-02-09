import { type User } from '@/api/types';

export function getUser(): User | null {
  const user = sessionStorage.getItem('user');
  if (user) {
    return JSON.parse(user);
  }
  return null;
}

export function setUser(user: User): void {
  sessionStorage.setItem('user', JSON.stringify(user));
}

export function getChatPartner(): string | null {
  const chatPartner = sessionStorage.getItem('chatPartner');
  if (chatPartner) {
    return JSON.parse(chatPartner);
  }
  return null;
}

export function setChatPartner(chatPartner: string): void {
  sessionStorage.setItem('chatPartner', JSON.stringify(chatPartner));
}
