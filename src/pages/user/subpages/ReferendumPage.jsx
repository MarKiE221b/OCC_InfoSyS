import React from "react";
import { Outlet } from "react-router";

const ReferendumPage = () => {
  return (
    <div className="">
      <div className="card bg-base-100 shadow-xl p-5">
        <h2 className="text-xl font-semibold inline-block">Referendum</h2>
        <div className="divider mt-2"></div>
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ReferendumPage;
