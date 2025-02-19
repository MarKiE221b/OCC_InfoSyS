// src/components/LineChart.jsx
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the necessary Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = () => {
  // Sample data for the chart
  const data = {
    labels: [10000, 5000, 3000, 1000], // X-axis labels (can represent time or any unit)
    datasets: [
      
      {
        label: "Agreed",
        data: [5325], // Y-axis data points for agreed values
        fill: false, // No fill below the line
        borderColor: "#3b82f6", // Line color for agreed
        tension: 0.1, // Curve the line
      },
      {
        label: "Disagreed",
        data: [10, 20, 30, 40], // Y-axis data points for disagreed values
        fill: false, // No fill below the line
        borderColor: "#ef4444", // Line color for disagreed
        tension: 0.1, // Curve the line
      },
    ],
  };

  // Options for customization (title, axes, etc.)
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Agreed, and Disagreed Over Time", // Update the chart title
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Time", // X-axis title (can be time or any other dimension)
        },
      },
      y: {
        title: {
          display: true,
          text: "Count", // Y-axis title (number of agreed, disagreed, sales, etc.)
        },
      },
    },
  };

  return (
    <div className="line-chart-container mx-auto mt-10">
      {/* DaisyUI Card Component */}
      <div className="card bg-base-100 shadow-xl p-6">
        <h2 className="card-title text-xl font-semibold mb-4">
          Sales, Agreed, and Disagreed Over Time
        </h2>
        <div className="card-body">
          {/* Add custom width and height to scale the chart */}
          <div className="w-full">
            {" "}
            {/* Increased height for better scaling */}
            <Line data={data} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LineChart;
