import React, { useState } from "react";
import { Outlet } from "react-router";
import NavBar from "../components/Navbar.jsx";
import LeftSideBar from "../components/LeftSideBar.jsx";

const MainLayout = () => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <NavBar />

        {/* Page content here */}
        <div className="h-full overflow-y-auto md:pt-4 pt-4 px-6 bg-base-200">
          <Outlet />
        </div>
      </div>

      <LeftSideBar />
    </div>
  );
};

export default MainLayout;
