import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const BarChartComponent = () => {
  // Sample data

  const data = [
    {
      name: "Members",
      agreed: Math.random() * 1000 + 500,
      disagreed: Math.random() * 1000 + 500,
    },
  ];

  return (
    <div className="card w-full p-6 bg-base-100 shadow-xl mt-6">
      <div className="text-xl font-semibold">Members Approval</div>
      <div className="divider mt-2"></div>

      <div className="h-full w-full pb-6 bg-base-100">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="disagreed" fill="rgba(255, 99, 132, 1)" />
            <Bar dataKey="agreed" fill="rgba(53, 162, 235, 1)" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BarChartComponent;
