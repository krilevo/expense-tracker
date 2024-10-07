import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { deleteTransaction, editTransaction } from '../../store/transactionsSlice';
import { Transaction } from '../../types';

const TransactionList: React.FC = () => {
  const dispatch = useAppDispatch();

  // Select transactions and categories from the Redux store
  const transactions = useAppSelector(state => state.transactions.transactions);
  const categories = useAppSelector(state => state.categories.categories);

  // Local state for editing a transaction
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [form, setForm] = useState<Omit<Transaction, 'id'>>({
    amount: 0,
    categoryId: '',
    date: '',
    description: '',
    type: 'expense',
  });

  // Handle input changes for both inputs and selects
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: name === 'amount' ? parseFloat(value) : value,
    }));
  };

  // Handle form submission for editing a transaction
  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTransaction) return;

    const updatedTransaction: Transaction = { id: editingTransaction.id, ...form };
    dispatch(editTransaction(updatedTransaction));

    // Reset local state
    setEditingTransaction(null);
    setForm({
      amount: 0,
      categoryId: '',
      date: '',
      description: '',
      type: 'expense',
    });
  };

  // Handle deleting a transaction
  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      dispatch(deleteTransaction(id));
    }
  };

  // Handle initiating edit mode
  const initiateEdit = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setForm({
      amount: transaction.amount,
      categoryId: transaction.categoryId,
      date: transaction.date,
      description: transaction.description || '',
      type: transaction.type,
    });
  };

  // Get category name by ID
  const getCategoryName = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'Unknown';
  };

  return (
    <div className="max-w-4xl max-h-screen overflow-y-auto mx-auto my-2 bg-white p-6 rounded shadow-md flex-1">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Transactions</h2>

      {/* Edit Transaction Form */}
      {editingTransaction && (
        <form onSubmit={handleEditSubmit} className="mb-6 border-t pt-4">
          <h3 className="text-xl font-medium mb-4 text-gray-700">Edit Transaction</h3>

          {/* Type Selection */}
          <div className="mb-4">
            <label htmlFor="edit-type" className="block text-gray-700 font-medium mb-2">Type:</label>
            <select
              id="edit-type"
              name="type"
              value={form.type}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          {/* Amount Input */}
          <div className="mb-4">
            <label htmlFor="edit-amount" className="block text-gray-700 font-medium mb-2">Amount ($):</label>
            <input
              type="number"
              id="edit-amount"
              name="amount"
              value={form.amount}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter amount"
            />
          </div>

          {/* Category Input */}
          <div className="mb-4">
            <label htmlFor="edit-category" className="block text-gray-700 font-medium mb-2">Category:</label>
            <select
              id="edit-category"
              name="categoryId"
              value={form.categoryId}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Category</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          {/* Date Input */}
          <div className="mb-4">
            <label htmlFor="edit-date" className="block text-gray-700 font-medium mb-2">Date:</label>
            <input
              type="date"
              id="edit-date"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Description Input */}
          <div className="mb-6">
            <label htmlFor="edit-description" className="block text-gray-700 font-medium mb-2">Description:</label>
            <input
              type="text"
              id="edit-description"
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Optional description"
            />
          </div>

          {/* Buttons */}
          <div className="flex space-x-4">
            <button
              type="submit"
              className="flex-1 bg-green-500 text-white font-semibold py-2 px-4 rounded hover:bg-green-600 transition-colors"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => {
                setEditingTransaction(null);
                setForm({
                  amount: 0,
                  categoryId: '',
                  date: '',
                  description: '',
                  type: 'expense',
                });
              }}
              className="flex-1 bg-gray-500 text-white font-semibold py-2 px-4 rounded hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Transactions Table */}
      {transactions.length === 0 ? (
        <p className="text-gray-600">No transactions available. Start adding some!</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b-2 border-gray-200 text-left text-gray-700">Type</th>
                <th className="py-2 px-4 border-b-2 border-gray-200 text-left text-gray-700">Amount ($)</th>
                <th className="py-2 px-4 border-b-2 border-gray-200 text-left text-gray-700">Category</th>
                <th className="py-2 px-4 border-b-2 border-gray-200 text-left text-gray-700">Date</th>
                <th className="py-2 px-4 border-b-2 border-gray-200 text-left text-gray-700">Description</th>
                <th className="py-2 px-4 border-b-2 border-gray-200 text-center text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map(transaction => (
                <tr key={transaction.id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border-b border-gray-200">
                    {transaction.type === 'income' ? (
                      <span className="text-green-600 font-medium">Income</span>
                    ) : (
                      <span className="text-red-600 font-medium">Expense</span>
                    )}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {transaction.amount.toFixed(2)}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {getCategoryName(transaction.categoryId)}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {new Date(transaction.date).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {transaction.description || '-'}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200 text-center">
                    <div className="flex justify-center space-x-2">
                      <button
                        onClick={() => initiateEdit(transaction)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(transaction.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TransactionList;
