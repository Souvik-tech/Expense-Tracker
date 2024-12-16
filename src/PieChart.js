import React from "react";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";

const ExpensePieChart = ({ expenseList }) => {
  // Group expenses by category and calculate percentages
  const categoryData = expenseList.reduce((acc, curr) => {
    const category = curr.category;
    acc[category] = (acc[category] || 0) + curr.amount;
    return acc;
  }, {});

  const data = Object.keys(categoryData).map((key) => ({
    name: key,
    value: categoryData[key],
  }));

  const COLORS = ["#800080", "#FFA500", "#FFFF00"]; // Purple, Orange, Yellow

  return (
    <PieChart width={300} height={300}>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        innerRadius={60}
        outerRadius={80}
        fill="#8884d8"
        paddingAngle={5}
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default ExpensePieChart;
