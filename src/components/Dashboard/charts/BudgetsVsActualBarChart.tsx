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

interface BudgetVsActualData {
  category: string;
  budget: number;
  actual: number;
}

interface Props {
  data: BudgetVsActualData[];
}

const BudgetVsActualBarChart: React.FC<Props> = ({ data }) => {
  return (
    <div className="mb-8">
      <h3 className="text-xl font-medium mb-4">Budget vs. Actual Spending</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="budget" fill="#8884d8" name="Budget" />
          <Bar dataKey="actual" fill="#82ca9d" name="Actual" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BudgetVsActualBarChart;
