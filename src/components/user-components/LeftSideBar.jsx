import React from "react";
import { HiMiniSquaresPlus } from "react-icons/hi2";
import { FaSchool,FaFileAlt } from "react-icons/fa";
import { IoMdPeople } from "react-icons/io";
import { FaGraduationCap } from "react-icons/fa6";


import { Link, NavLink, useLocation } from "react-router";

import logo from "../../assets/Commission_on_Higher_Education_(CHEd).png";

const LeftSideBar = () => {
  const location = useLocation();

  const routes = [
    {
      path: "/user",
      icon: <HiMiniSquaresPlus />,
      name: "Dashboard",
    },
    {
      path: "/user/school",
      icon: <FaSchool />,
      name: "Schools",
    },
    {
      path: "/user/member",
      icon: <IoMdPeople />,
      name: "Members",
    },
    {
      path: "/user/program",
      icon: <FaGraduationCap />,
      name: "Programs",
    },
    {
      path: "/user/documents",
      icon: <FaFileAlt />,
      name: "Documents",
    },
  ];

  const close = (e) => {
    document.getElementById("my-drawer-3").click();
  };

  return (
    <div className="drawer-side z-30">
      <label
        htmlFor="my-drawer-3"
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>
      <ul className="menu bg-base-100 min-h-full w-80 p-4">
        <button
          className="btn btn-ghost bg-base-300  btn-circle z-50 top-0 right-0 mt-4 mr-2 absolute lg:hidden"
          onClick={() => close()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            aria-hidden="true"
            className="h-5 inline-block w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>

        <li className="mb-2 font-semibold text-xl mr-14">
          <Link to={"/app/welcome"}>
            <img className="mask mask-squircle w-10" src={logo} alt="logo" />
            OCDRA-SPISyS
          </Link>
        </li>

        {routes.map((route, k) => {
          return (
            <li className="mb-2" key={k}>
              {route.submenu ? (
                <SidebarSubmenu {...route} />
              ) : (
                <NavLink
                  end
                  to={route.path}
                  className={({ isActive }) =>
                    `${
                      isActive ? "font-semibold  bg-base-200 " : "font-normal"
                    }`
                  }
                >
                  {route.icon} {route.name}
                  {location.pathname === route.path ? (
                    <span
                      className="absolute inset-y-0 left-0 w-1 rounded-tr-md rounded-br-md bg-primary "
                      aria-hidden="true"
                    ></span>
                  ) : null}
                </NavLink>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default LeftSideBar;
