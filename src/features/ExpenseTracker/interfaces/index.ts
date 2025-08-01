export interface Expense {
  id: string;
  date: string;
  description: string;
  amount: number;
}

export interface ExpenseFormData {
  date: string;
  description: string;
  amount: string;
}