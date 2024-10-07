import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTransaction } from '../../store/transactionsSlice';
import { v4 as uuidv4 } from 'uuid';
import { Transaction } from '../../types';
import { useAppSelector } from '../../store/hooks';

const TransactionForm: React.FC = () => {
  const dispatch = useDispatch();
  const categories = useAppSelector(state => state.categories.categories)
  
  // Initialize form state, omitting 'id' as it will be generated
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

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTransaction: Transaction = { id: uuidv4(), ...form };
    dispatch(addTransaction(newTransaction));
    
    // Reset form fields after submission
    setForm({
      amount: 0,
      categoryId: '',
      date: '',
      description: '',
      type: 'expense',
    });
  };

  const categoriesByType = categories.filter(cat => cat.type === form.type)

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto my-2 bg-white p-6 rounded shadow-md flex-1">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Add New Transaction</h2>
      
      {/* Type Selection */}
      <div className="mb-4">
        <label htmlFor="type" className="block text-gray-700 font-medium mb-2">Type:</label>
        <select
          id="type"
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
        <label htmlFor="amount" className="block text-gray-700 font-medium mb-2">Amount:</label>
        <input
          type="number"
          id="amount"
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
        <label htmlFor="category" className="block text-gray-700 font-medium mb-2">Category:</label>
        <select
          id="category"
          name="categoryId"
          value={form.categoryId}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Select Category</option>
          {categoriesByType.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
      </div>

      {/* Date Input */}
      <div className="mb-4">
        <label htmlFor="date" className="block text-gray-700 font-medium mb-2">Date:</label>
        <input
          type="date"
          id="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Description Input */}
      <div className="mb-6">
        <label htmlFor="description" className="block text-gray-700 font-medium mb-2">Description:</label>
        <input
          type="text"
          id="description"
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Optional description"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition-colors"
      >
        Add Transaction
      </button>
    </form>
  );
};

export default TransactionForm;
