import React, { use } from "react";
import { Outlet, useLocation } from "react-router";

const ReferendumPage = () => {
  const uri = useLocation().pathname.split("/").slice(0, 4).join("/");

  return (
    <div className="flex justify-center items-start py-10">
      <div className="card bg-white shadow-2xl rounded-lg p-8 w-full max-w-7xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            {uri === "/user/documents/ref" ? "Travel Referendum" : "Referendum"}
          </h2>
          <button className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold px-5 py-2 rounded-lg shadow-md hover:from-blue-600 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5-5m0 0l5 5m-5-5v12"
              />
            </svg>
            Upload Referendum
          </button>
        </div>
        <div className="divider my-4"></div>
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ReferendumPage;
