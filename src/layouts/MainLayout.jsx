import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import NavBar from "../components/admin-components/Navbar.jsx";
import LeftSideBar from "../components/admin-components/LeftSideBar.jsx";
import { useVerifyToken } from "../hooks/useAuthentication.js";

const MainLayout = () => {
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
        console.log(payload);

        if (payload.payload.role === "SuperAdmin") {
          navigate("/");
        } else {
          navigate("/login");
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

export default MainLayout;
