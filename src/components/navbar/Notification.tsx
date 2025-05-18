import { Badge } from "@mui/material";
import { IoNotificationsSharp } from "react-icons/io5";

const Notification = () => {
  return (
    <div>
      <Badge
        badgeContent={4}
        color="primary"
        sx={{
          "& .MuiBadge-badge": {
            minWidth: "16px",
            height: "16px",
            fontSize: "10px",
            padding: "0 4px",
          },
        }}
      >
        <IoNotificationsSharp className=" text-[#AEB5C1] w-[20px] h-[26px]" />
      </Badge>
    </div>
  );
};

export default Notification;
