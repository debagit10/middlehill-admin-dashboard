import React from "react";
import illustration from "../images/illustration.png";
import logo from "../logo/Logo.png";
import { Typography } from "@mui/material";

interface ChildrenProps {
  children: React.ReactNode;
}

const Auth: React.FC<ChildrenProps> = ({ children }) => {
  return (
    <div className="bg-[#F7F9FC] flex justify-around p-[1rem] ">
      <div>
        <div className="flex gap-[4px] ">
          <img className="h-[21.5px] w-[28.41px]" src={logo} alt="logo" />
          <Typography
            fontWeight={600}
            sx={{ fontFamily: "Open Sans, sans-serif" }}
          >
            Mid'hill Cash Flow
          </Typography>
        </div>

        <div className="flex justify-center items-center">{children}</div>
      </div>

      <div>
        <img className="h-[95vh] w-[676px]" src={illustration} alt="auth" />
      </div>
    </div>
  );
};

export default Auth;
