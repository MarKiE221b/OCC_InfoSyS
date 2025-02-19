import React from "react";
import sill from "../assets/sillhouete.png";
import LineChart from "../components/charts/LineChart.jsx";
import BarChart from "../components/charts/BarChart.jsx";

const Dashboard = () => {
  return (
    <>
      <div className="grid grid-cols-4 gap-6">
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

      <div className="grid grid-cols-2 gap-6">
        <div>
          <BarChart />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
