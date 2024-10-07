import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface MonthlyTrendsData {
  month: string;
  income: number;
  expense: number;
}

interface Props {
  data: MonthlyTrendsData[];
}

const MonthlyTrendsLineChart: React.FC<Props> = ({ data }) => {
  return (
    <div className="mb-8">
      <h3 className="text-xl font-medium mb-4">Monthly Income and Expenses Trends</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="income" stroke="#82ca9d" name="Income" />
          <Line type="monotone" dataKey="expense" stroke="#8884d8" name="Expense" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyTrendsLineChart;
