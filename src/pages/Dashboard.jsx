import React from "react";
import PieChartComponent from "../components/charts/PieChartComponent.jsx";
import LineChartComponent from "../components/charts/LineChartComponent.jsx";
import BarChartComponent from "../components/charts/BarChartComponent.jsx";

const Dashboard = () => {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="stats shadow">
          <div className="stat">
            <div className="stat-title">Total Enrollees</div>
            <div className="stat-value">20,523</div>
            <div className="stat-desc"></div>
          </div>
        </div>

        <div className="stats shadow">
          <div className="stat">
            <div className="stat-title">Total Graduates</div>
            <div className="stat-value">13,400</div>
            <div className="stat-desc"></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <LineChartComponent />
        </div>

        <div>
          <PieChartComponent />
        </div>

        <div>
          <BarChartComponent />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
