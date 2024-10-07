import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface IncomeExpenseData {
  month: string;
  income: number;
  expense: number;
}

interface Props {
  data: IncomeExpenseData[];
}

const IncomeExpenseBarChart: React.FC<Props> = ({ data }) => {
  return (
    <div className="mb-8">
      <h3 className="text-xl font-medium mb-4">Income vs. Expense per Month</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="income" fill="#82ca9d" name="Income" />
          <Bar dataKey="expense" fill="#8884d8" name="Expense" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default IncomeExpenseBarChart;
