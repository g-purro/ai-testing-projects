import { useState } from "react";
import { ExpenseForm } from "../components/ExpenseForm";
import { ExpenseTable } from "../components/ExpenseTable";
import { Expense } from "../interfaces";

export const ExpenseTrackerPage = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const addExpense = (expenseData: { date: string; description: string; amount: number }) => {
    const newExpense: Expense = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      ...expenseData,
    };
    setExpenses([...expenses, newExpense]);
  };

  const deleteExpense = (id: string) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Expense Tracker</h1>
          <p className="text-gray-600">Track your daily expenses with ease</p>
        </div>

        <div className="space-y-6">
          <ExpenseForm onAddExpense={addExpense} />
          <ExpenseTable expenses={expenses} onDeleteExpense={deleteExpense} />
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Data is stored in your browser session and will be cleared on page reload.
          </p>
        </div>
      </div>
    </div>
  );
};