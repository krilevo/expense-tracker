import React from 'react';

interface BudgetUtilizationData {
  category: string;
  budget: number;
  actual: number;
  utilization: number;
}

interface Props {
  data: BudgetUtilizationData[];
}

const BudgetUtilizationTable: React.FC<Props> = ({ data }) => {
  return (
    <div className="mb-8">
      <h3 className="text-xl font-medium mb-4">Budget Utilization</h3>
      {data.length === 0 ? (
        <p className="text-gray-600">No budgets set yet.</p>
      ) : (
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Category</th>
              <th className="py-2 px-4 border-b">Budget ($)</th>
              <th className="py-2 px-4 border-b">Actual ($)</th>
              <th className="py-2 px-4 border-b">Utilization (%)</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className="text-center">
                <td className="py-2 px-4 border-b">{item.category}</td>
                <td className="py-2 px-4 border-b">{item.budget.toFixed(2)}</td>
                <td className="py-2 px-4 border-b">{item.actual.toFixed(2)}</td>
                <td
                  className={`py-2 px-4 border-b ${
                    item.utilization > 100 ? 'text-red-500' : 'text-green-500'
                  }`}
                >
                  {item.utilization.toFixed(2)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BudgetUtilizationTable;
