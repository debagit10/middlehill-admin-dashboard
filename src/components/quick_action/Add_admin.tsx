import { Typography } from "@mui/material";
import user from "../../icons/user.png";

const Add_admin = () => {
  return (
    <div className="bg-[#FAFAFA] rounded-[4px] py-[16px] w-[102px] h-[112px] ">
      <div className="flex flex-col justify-center items-center gap-[18px]">
        <img src={user} className="w-[18px] h-[18px]" />

        <Typography
          fontSize={13}
          fontWeight={600}
          sx={{ fontFamily: "Open Sans, sans-serif" }}
        >
          Add Admin
        </Typography>
      </div>
    </div>
  );
};

export default Add_admin;
