export interface Transaction {
  id: string;
  amount: number;
  categoryId: string;
  date: string;
  description?: string;
  type: 'income' | 'expense';
}

export interface Category {
  id: string;
  name: string;
  type: 'income' | 'expense';
}

export interface Budget {
  id: string;
  categoryId: string;
  amount: number;
}
