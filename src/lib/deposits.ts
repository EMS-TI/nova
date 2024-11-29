import { Deposit } from '../types';

export function getDeposits(username: string): Deposit[] {
  const savedDeposits = JSON.parse(
    localStorage.getItem(`${username}_deposits`) || '[]'
  );

  if (savedDeposits.length === 0) {
    return Array.from({ length: 100 }, (_, i) => ({
      id: i + 1,
      amount: i + 1,
      date: '',
      marked: false,
    }));
  }

  return savedDeposits;
}

export function saveDeposits(username: string, deposits: Deposit[]): void {
  localStorage.setItem(`${username}_deposits`, JSON.stringify(deposits));
}

export function calculateTotal(deposits: Deposit[]): number {
  return deposits.reduce((sum, deposit) => sum + (deposit.marked ? deposit.amount : 0), 0);
}

export const TOTAL_REQUIRED = 5050;