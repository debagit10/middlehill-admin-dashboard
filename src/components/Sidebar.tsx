import logo from "../logo/Logo_white.png";
import { Typography } from "@mui/material";
import { LuLayoutDashboard } from "react-icons/lu";
import { BsCash } from "react-icons/bs";
import { TbUsers } from "react-icons/tb";

import { FaRegUserCircle } from "react-icons/fa";

import { useNavigate, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Logout from "../modals/Logout";

const sideItems = [
  {
    id: 1,
    name: "Dashboard",
    icon: <LuLayoutDashboard />,
    route: "/dashboard",
  },
  {
    id: 1,
    name: "Business Management",
    icon: <BsCash />,
    route: "/business-mgt",
  },

  { id: 1, name: "Admin Management", icon: <TbUsers />, route: "/admin-mgt" },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [activeRoute, setActiveRoute] = useState(location.pathname);

  useEffect(() => {
    setActiveRoute(location.pathname); // syncs state with actual route on load or refresh
  }, [location.pathname]);

  return (
    <div className="w-[272px] bg-[#1358A3] flex flex-col justify-between text-white p-[.5rem] h-[100vh]">
      {/* Top Section */}
      <div>
        {/* Logo Section */}
        <div
          className="flex gap-[4px] py-[23px] px-[16px] cursor-pointer mb-[24px]"
          onClick={() => navigate("/dashboard")}
        >
          <img className="h-[21.5px] w-[28.41px]" src={logo} alt="logo" />
          <Typography
            fontWeight={600}
            sx={{ fontFamily: "Open Sans, sans-serif" }}
            fontSize={"18px"}
          >
            Mid'hill Cash Flow
          </Typography>
        </div>

        {/* Sidebar Items */}
        <div className="flex flex-col gap-[4px]">
          {sideItems.map((item, index) => {
            return (
              <div
                key={index}
                className={`flex items-center gap-[12px] py-[12px] px-[16px] rounded-[8px] cursor-pointer transition-all duration-300 ease-in-out ${
                  activeRoute === item.route
                    ? "bg-[#FFFFFF33] text-[#FFFFFF] font-semibold"
                    : ""
                }`}
                onClick={() => {
                  navigate(item.route);
                  setActiveRoute(item.route);
                }}
              >
                <div>
                  {React.cloneElement(item.icon, {
                    size: 18,
                  })}
                </div>
                <Typography
                  fontWeight={400}
                  sx={{ fontFamily: "Open Sans, sans-serif" }}
                  fontSize="14px"
                >
                  {item.name}
                </Typography>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col gap-[12px] mb-[24px] px-[16px]">
        <div
          className={`flex items-center gap-[12px] py-[12px] px-[16px] rounded-[8px] cursor-pointer transition-all duration-300 ease-in-out ${
            activeRoute === "/profile"
              ? "bg-[#FFFFFF33] text-[#FFFFFF] font-semibold"
              : ""
          }`}
          onClick={() => {
            navigate("/profile");
            setActiveRoute("/profile");
          }}
        >
          <FaRegUserCircle size={18} />
          <Typography
            fontWeight={400}
            sx={{ fontFamily: "Open Sans, sans-serif" }}
            fontSize="14px"
          >
            Profile
          </Typography>
        </div>
        <div className="flex items-center gap-[12px] px-[16px] rounded-[8px] cursor-pointer">
          <Logout color="#FFFFFF" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
