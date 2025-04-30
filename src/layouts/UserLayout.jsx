import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import NavBar from "../components/user-components/Navbar.jsx";
import LeftSideBar from "../components/user-components/LeftSideBar.jsx";
import { useVerifyToken } from "../hooks/useAuthentication.js";

const UserLayout = () => {
  const navigate = useNavigate();

  const {
    mutateAsync: verifyMutation,
    isPending: pendingMutation,
    isSuccess: successfulMutate,
  } = useVerifyToken();

  useEffect(() => {
    const verifyFunction = async () => {
      try {
        const payload = await verifyMutation({
          token: localStorage.getItem("ACCESSTOKEN"),
        });

        if (payload.payload.role === "Admin") {
          navigate("/user");
        }
      } catch (error) {
        navigate("/login");
      }
    };

    verifyFunction();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  if (pendingMutation)
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );

  if (successfulMutate)
    return (
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          {/* Navbar */}
          <NavBar onLogout={handleLogout} />

          {/* Page content here */}
          <div className="min-h-screen overflow-y-auto md:pt-4 pt-4 px-6 bg-base-200">
            <Outlet />
          </div>
        </div>

        <LeftSideBar />
      </div>
    );
};

export default UserLayout;
