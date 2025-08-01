import { Expense } from "../interfaces";

interface ExpenseTableProps {
  expenses: Expense[];
  onDeleteExpense: (id: string) => void;
}

export const ExpenseTable = ({ expenses, onDeleteExpense }: ExpenseTableProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const formatAmount = (amount: number) => {
    return `$${amount.toFixed(2)}`;
  };

  const getTotalAmount = () => {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
  };

  if (expenses.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Expenses</h2>
        <p className="text-gray-500 text-center py-8">No expenses recorded yet. Add your first expense above!</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Expenses ({expenses.length} items)
      </h2>
      
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Date</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Description</th>
              <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">Amount</th>
              <th className="px-4 py-3 text-center text-sm font-medium text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {expenses.map((expense) => (
              <tr key={expense.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm text-gray-900">
                  {formatDate(expense.date)}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900">
                  {expense.description}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900 text-right font-medium">
                  {formatAmount(expense.amount)}
                </td>
                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() => onDeleteExpense(expense.id)}
                    className="text-red-600 hover:text-red-800 bg-red-50 hover:bg-red-100 px-3 py-1 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
                    title="Delete expense"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-gray-50">
              <td className="px-4 py-3 text-sm font-semibold text-gray-900" colSpan={2}>
                Total
              </td>
              <td className="px-4 py-3 text-sm font-bold text-gray-900 text-right">
                {formatAmount(getTotalAmount())}
              </td>
              <td className="px-4 py-3"></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};