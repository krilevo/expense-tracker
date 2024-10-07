import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setBudget, editBudget, deleteBudget } from '../../store/budgetsSlice';
import { Budget } from '../../types';

const BudgetTracker: React.FC = () => {
  const dispatch = useAppDispatch();

  // Select budgets and categories from the Redux store
  const budgets = useAppSelector(state => state.budgets.budgets);
  const categories = useAppSelector(state => state.categories.categories);

  // Local state for form inputs
  const [categoryId, setCategoryId] = useState<string>('');
  const [amount, setAmount] = useState<number>(0);
  const [editingBudget, setEditingBudget] = useState<Budget | null>(null);

  // Handle form submission for adding or updating a budget
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!categoryId || amount <= 0) {
      // Simple validation: Ensure category is selected and amount is positive
      alert('Please select a category and enter a valid amount.');
      return;
    }

    if (editingBudget) {
      // If editing, dispatch editBudget action
      dispatch(editBudget({ ...editingBudget, categoryId, amount }));
      setEditingBudget(null);
    } else {
      // If adding new, dispatch setBudget action
      dispatch(setBudget(categoryId, amount));
    }

    // Reset form fields
    setCategoryId('');
    setAmount(0);
  };

  // Handle editing a budget
  const handleEdit = (budget: Budget) => {
    setEditingBudget(budget);
    setCategoryId(budget.categoryId);
    setAmount(budget.amount);
  };

  // Handle deleting a budget
  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this budget?')) {
      dispatch(deleteBudget(id));
    }
  };

  // Get categories of type 'expense' for the dropdown
  const expenseCategories = categories.filter(cat => cat.type === 'expense');

  return (
    <div className="max-w-2xl mx-auto my-2 bg-white p-6 rounded shadow-md flex-1">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Budget Tracker</h2>

      {/* Budget Form */}
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="mb-4">
          <label htmlFor="category" className="block text-gray-700 font-medium mb-2">Category:</label>
          <select
            id="category"
            name="category"
            value={categoryId}
            onChange={e => setCategoryId(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Category</option>
            {expenseCategories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="amount" className="block text-gray-700 font-medium mb-2">Amount ($):</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={amount}
            onChange={e => setAmount(parseFloat(e.target.value))}
            min="0"
            step="0.01"
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter budget amount"
            required
          />
        </div>

        <div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition-colors"
          >
            {editingBudget ? 'Update Budget' : 'Set Budget'}
          </button>
        </div>

        {/* Cancel Editing Button */}
        {editingBudget && (
          <button
            type="button"
            onClick={() => {
              setEditingBudget(null);
              setCategoryId('');
              setAmount(0);
            }}
            className="w-full mt-2 bg-gray-500 text-white font-semibold py-2 px-4 rounded hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
        )}
      </form>

      {/* Budgets List */}
      <div>
        <h3 className="text-xl font-medium mb-2 text-gray-700">Your Budgets</h3>
        {budgets.length === 0 ? (
          <p className="text-gray-600">No budgets set yet.</p>
        ) : (
          <ul>
            {budgets.map(budget => {
              const category = categories.find(cat => cat.id === budget.categoryId);
              return (
                <li key={budget.id} className="flex justify-between items-center bg-gray-100 p-3 rounded mb-2">
                  <div>
                    <span className="font-medium">{category ? category.name : 'Unknown Category'}</span>
                    <span className="text-gray-600 ml-2">- ${budget.amount.toFixed(2)}</span>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(budget)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(budget.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default BudgetTracker;
