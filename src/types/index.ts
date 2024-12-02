export interface User {
  username: string;
  isLoggedIn: boolean;
}

export interface Deposit {
  withdrawn: any;
  withdrawn: any;
  withdrawn: any;
  withdrawn: any;
  id: number;
  amount: number;
  date: string;
  marked: boolean;
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export interface LayoutProps {
  children: React.ReactNode;
}