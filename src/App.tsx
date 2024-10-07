import React from 'react';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import CategoryManager from './components/CategoryManager';
import BudgetTracker from './components/BudgetTracker';
import Dashboard from './components/Dashboard';

const App: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Expense Tracker Dashboard</h1>
      
      <Dashboard />

      <div className="grid grid-cols-1 gap-6 mt-8">
        <div className='md:flex justify-center items-start gap-x-6'>
          <TransactionForm />
          <TransactionList />
        </div>
        <div className='md:flex justify-between items-start gap-x-6'>
          <CategoryManager />
          <BudgetTracker />
        </div>
      </div>
    </div>
  );
};

export default App;
