import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

const ExpenseBarChart = ({ expenseList }) => {
    if (!expenseList || expenseList.length === 0) {
        return null; // Return nothing if expenseList is empty
      }
  // Group expenses by category and sum amounts
  const groupedExpenses = expenseList.reduce((acc, expense) => {
    const { category, amount } = expense;
    const existingCategory = acc.find((entry) => entry.category === category);

    if (existingCategory) {
      existingCategory.amount += amount;
    } else {
      acc.push({ category, amount });
    }
    return acc;
  }, []);

  return (
    <BarChart
      layout="vertical"
      width={500}
      height={300}
      data={groupedExpenses}
      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis type="number" />
      <YAxis dataKey="category" type="category" />
      <Tooltip />
      <Legend />
      <Bar dataKey="amount" fill="#8884d8" barSize={20} />
    </BarChart>
  );
};

export default ExpenseBarChart;
