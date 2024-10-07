import React from 'react';
import { useAppSelector } from '../../store/hooks';
import IncomeExpenseBarChart from './charts/IncomeExpenseBarChart';
import CategorySpendingPieChart from './charts/CategorySpendingPieChart';
import MonthlyTrendsLineChart from './charts/MonthlyTrendsLineChart';
import BudgetVsActualBarChart from './charts/BudgetsVsActualBarChart';
import BudgetUtilizationTable from './charts/BudgetUtilizationTable';

const Dashboard: React.FC = () => {
  // Select transactions, categories and budgets from the Redux store
  const transactions = useAppSelector(state => state.transactions.transactions);
  const categories = useAppSelector(state => state.categories.categories);
  const budgets = useAppSelector(state => state.budgets.budgets);

  // Helper function to format data for Income vs Expense Bar Chart
  const getIncomeExpenseData = () => {
    // Create a map to aggregate income and expenses per month
    const dataMap: { [key: string]: { month: string; income: number; expense: number } } = {};

    transactions.forEach(transaction => {
      const date = new Date(transaction.date);
      // Format month as "MMM YYYY", e.g., "Apr 2024"
      const month = date.toLocaleString('default', { month: 'short', year: 'numeric' });

      if (!dataMap[month]) {
        dataMap[month] = { month, income: 0, expense: 0 };
      }

      if (transaction.type === 'income') {
        dataMap[month].income += transaction.amount;
      } else {
        dataMap[month].expense += transaction.amount;
      }
    });

    // Convert the map to an array sorted by date
    const sortedData = Object.values(dataMap).sort((a, b) => {
      const [aMonth, aYear] = a.month.split(' ');
      const [bMonth, bYear] = b.month.split(' ');
      const dateA = new Date(`${aMonth} 1, ${aYear}`);
      const dateB = new Date(`${bMonth} 1, ${bYear}`);
      return dateA.getTime() - dateB.getTime();
    });

    return sortedData;
  };

  // Helper function to format data for Category-wise Spending Pie Chart
  const getCategorySpendingData = () => {
    // Create a map to aggregate expenses per category
    const dataMap: { [key: string]: number } = {};

    transactions.forEach(transaction => {
      if (transaction.type === 'expense') {
        if (!dataMap[transaction.categoryId]) {
          dataMap[transaction.categoryId] = 0;
        }
        dataMap[transaction.categoryId] += transaction.amount;
      }
    });

    // Convert categoryId to category names and map it to an array
    const data = Object.entries(dataMap).map(([categoryId, value]) => {
    const categoryName = categories.find(cat => cat.id === categoryId)?.name || 'Unknown';
    return { name: categoryName, value };
  });

    return data;
  };

  // Helper function to format data for Monthly Trends Line Chart
  const getMonthlyTrendsData = () => {
    // Similar to Income vs Expense but for trend lines
    const dataMap: { [key: string]: { month: string; income: number; expense: number } } = {};

    transactions.forEach(transaction => {
      const date = new Date(transaction.date);
      const month = date.toLocaleString('default', { month: 'short', year: 'numeric' });

      if (!dataMap[month]) {
        dataMap[month] = { month, income: 0, expense: 0 };
      }

      if (transaction.type === 'income') {
        dataMap[month].income += transaction.amount;
      } else {
        dataMap[month].expense += transaction.amount;
      }
    });

    // Convert the map to an array sorted by date
    const sortedData = Object.values(dataMap).sort((a, b) => {
      const [aMonth, aYear] = a.month.split(' ');
      const [bMonth, bYear] = b.month.split(' ');
      const dateA = new Date(`${aMonth} 1, ${aYear}`);
      const dateB = new Date(`${bMonth} 1, ${bYear}`);
      return dateA.getTime() - dateB.getTime();
    });

    return sortedData;
  };

  // Helper function to format data for Budgets Vs actual Data
  const getBudgetVsActualData = () => {
    const dataMap: { [key: string]: { category: string; budget: number; actual: number } } = {};
  
    budgets.forEach(budget => {
      const categoryName = categories.find(cat => cat.id === budget.categoryId)?.name || 'Unknown';
      
      if (!dataMap[budget.categoryId]) {
        dataMap[budget.categoryId] = { category: categoryName, budget: budget.amount, actual: 0 };
      } else {
        dataMap[budget.categoryId].budget += budget.amount;
      }
    });
  
    transactions.forEach(transaction => {
      if (transaction.type === 'expense') {
        if (dataMap[transaction.categoryId]) {
          dataMap[transaction.categoryId].actual += transaction.amount;
        }
      }
    });
  
    // Convert the map to an array
    const data = Object.values(dataMap);
    return data;
  };  

  // Helper function to format data for Budget utilization
  const getBudgetUtilization = () => {
    const dataMap: { [key: string]: { category: string; budget: number; actual: number } } = {};
  
    // Populate dataMap with budgets
    budgets.forEach(budget => {
      const categoryName = categories.find(cat => cat.id === budget.categoryId)?.name || 'Unknown';
      if (!dataMap[budget.categoryId]) {
        dataMap[budget.categoryId] = { category: categoryName, budget: budget.amount, actual: 0 };
      }
    });
  
    // Sum actual expenses from transactions
    transactions.forEach(transaction => {
      if (transaction.type === 'expense') {
        const budgetedCategory = dataMap[transaction.categoryId];
        if (budgetedCategory) {
          budgetedCategory.actual += transaction.amount;
        }
      }
    });
  
    // Calculate the utilization percentage and return data
    const data = Object.values(dataMap).map(item => {
      const utilization = (item.actual / item.budget) * 100;
      return {
        category: item.category,
        budget: item.budget,
        actual: item.actual,
        utilization,
      };
    });
  
    return data;
  };   

  // Get the prepared data for each chart
  const incomeExpenseData = getIncomeExpenseData();
  const categorySpendingData = getCategorySpendingData();
  const monthlyTrendsData = getMonthlyTrendsData();
  const budgetVsActualData = getBudgetVsActualData();
  const budgetUtilizationData = getBudgetUtilization();

  return (
    <div className="dashboard p-4 bg-white shadow rounded">
      <h2 className="text-2xl font-semibold mb-6">Dashboard</h2>

      <IncomeExpenseBarChart data={incomeExpenseData}/>
      <CategorySpendingPieChart data={categorySpendingData}/>
      <MonthlyTrendsLineChart data={monthlyTrendsData}/>
      <BudgetVsActualBarChart data={budgetVsActualData}/>
      <BudgetUtilizationTable data={budgetUtilizationData}/>
    </div>
  );
};

export default Dashboard;
