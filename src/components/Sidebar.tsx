import logo from "../logo/Logo_white.png";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const sideItems = [
  { id: 1, name: "Dashboard", icon: logo, route: "/dashboard" },
  { id: 1, name: "Business Management", icon: logo, route: "/business-mgt" },
  { id: 1, name: "Transactions", icon: logo, route: "/transactions" },
  { id: 1, name: "Admin Management", icon: logo, route: "/admin-mgt" },
];

const Sidebar = () => {
  const navigate = useNavigate();
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
          {sideItems.map((item, index) => (
            <div
              key={index}
              className="flex gap-[12px] py-[12px] px-[16px] rounded-[4px] cursor-pointer"
              onClick={() => navigate(item.route)}
            >
              <img src={item.icon} alt="icon" />
              <Typography
                fontWeight={400}
                sx={{ fontFamily: "Open Sans, sans-serif" }}
                fontSize="14px"
              >
                {item.name}
              </Typography>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col gap-[12px] mb-[24px] px-[16px]">
        <div
          className="flex gap-[12px] items-center cursor-pointer"
          onClick={() => navigate("/settings")}
        >
          <img src={logo} alt="Settings" />
          <Typography
            fontWeight={400}
            sx={{ fontFamily: "Open Sans, sans-serif" }}
            fontSize="14px"
          >
            Settings
          </Typography>
        </div>
        <div className="flex gap-[12px] items-center cursor-pointer">
          <img src={logo} alt="Logout" />
          <Typography
            fontWeight={400}
            sx={{ fontFamily: "Open Sans, sans-serif" }}
            fontSize="14px"
          >
            Logout
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
