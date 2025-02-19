// src/components/LineChart.jsx
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const LineChartComponent = () => {
  const data = [
    { time: 10000, agreed: 5325, disagreed: 10 },
    { time: 5000, agreed: 5325, disagreed: 20 },
    { time: 3000, agreed: 5325, disagreed: 30 },
    { time: 1000, agreed: 5325, disagreed: 40 },
  ];

  return (
      <div className="card w-full p-6 bg-base-100 shadow-xl mt-6">
        <div className="text-xl font-semibold">Agreed, and Disagreed Over Time</div>
        <div className="divider mt-2"></div>
        <div className="w-full h-full flex justify-center overflow-auto">
          {/* Add custom width and height to scale the chart */}
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="time"
                label={{
                  value: "Time",
                  position: "insideBottomRight",
                  offset: 0,
                }}
              />
              <YAxis
                label={{ value: "Count", angle: -90, position: "insideLeft" }}
              />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="agreed"
                stroke="#3b82f6"
                activeDot={{ r: 8 }}
              />
              <Line
                type="monotone"
                dataKey="disagreed"
                stroke="#ef4444"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
  );
};

export default LineChartComponent;
