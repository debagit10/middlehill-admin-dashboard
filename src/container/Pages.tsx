import React from "react";
import Sidebar from "../components/Sidebar";
import Typography from "@mui/material/Typography";
import { Divider } from "@mui/material";
import Profile from "../modals/Profile";
import Notification from "../components/navbar/Notification";

interface PagesProps {
  children?: React.ReactNode;
  page: string;
}

const Pages: React.FC<PagesProps> = ({ children, page }) => {
  return (
    <div className="flex">
      <div>
        <Sidebar />
      </div>

      <div className="w-[100%]">
        <div className="px-5 py-4 flex justify-between ">
          <Typography
            color="#101928"
            fontSize={20}
            fontWeight={600}
            sx={{ fontFamily: "Open Sans, sans-serif" }}
          >
            {page}
          </Typography>

          <div className="flex gap-[16px]">
            <Notification />
            <Divider orientation="vertical" />
            <Profile />
          </div>
        </div>
        <Divider />

        <div className="px-5 bg-[#FAFAFA] h-[90vh]">{children}</div>
      </div>
    </div>
  );
};

export default Pages;
