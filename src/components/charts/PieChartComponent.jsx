import React from "react";
import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  Cell,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "India", value: 122 },
  { name: "Middle East", value: 219 },
  { name: "Europe", value: 30 },
  { name: "US", value: 51 },
  { name: "Latin America", value: 82 },
  { name: "Asia (non-India)", value: 13 },
];

const COLORS = [
  "#FF63FF",
  "#36A2EB",
  "#FFCCFF",
  "#4BB8FF",
  "#9966FF",
  "#FF9FFF",
];

const PieChartComponent = () => {
  return (
    <div className="card w-full p-6 bg-base-100 shadow-xl mt-6">
      <div className="text-xl font-semibold">Sample Pie Chart</div>
      <div className="divider mt-2"></div>
      <div className="w-full h-full flex justify-center overflow-auto">
        <ResponsiveContainer width="100%" height={400}>
          <PieChart width={400} height={400}>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius={150}
              fill="#8884d8"
              label
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PieChartComponent;
