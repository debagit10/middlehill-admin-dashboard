import { Avatar, Menu, MenuItem, Typography } from "@mui/material";
import logo from "../logo/logo.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import Logout from "./Logout";

const Profile = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();

  return (
    <div>
      <div onClick={handleClick} className="cursor-pointer">
        <Avatar alt="Remy Sharp" src={logo} sx={{ width: 24, height: 24 }} />
      </div>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{ sx: { borderRadius: 2, width: "170px" } }}
        sx={{ paddingX: ".5rem" }}
      >
        <MenuItem onClick={() => navigate("/profile")}>
          <div className="flex items-center text-[#344054] gap-2 rounded-[8px] cursor-pointer">
            <FaRegUserCircle size={18} />
            <Typography
              fontWeight={400}
              sx={{ fontFamily: "Open Sans, sans-serif" }}
              fontSize="14px"
            >
              Profile
            </Typography>
          </div>
        </MenuItem>

        <MenuItem>
          <Logout color="#344054" />
        </MenuItem>
      </Menu>
    </div>
  );
};

export default Profile;
