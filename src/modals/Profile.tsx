import { Avatar, Badge, Menu, MenuItem, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import Logout from "./Logout";

const Profile = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [adminDetails, setAdminDetails] = useState<{ name: string }>({
    name: "",
  });

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();

  useEffect(() => {
    const storedAdminData = localStorage.getItem("adminData");
    if (storedAdminData) {
      try {
        const parsedData = JSON.parse(storedAdminData);
        setAdminDetails(parsedData);
      } catch (error) {
        console.error("Failed to parse admin data:", error);
      }
    }
  }, []);

  return (
    <div>
      <div onClick={handleClick} className="cursor-pointer">
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          variant="dot"
          sx={{
            "& .MuiBadge-dot": {
              backgroundColor: "#4CAF50",
              border: "2px solid white",
              height: 12,
              width: 12,
              borderRadius: "50%",
            },
          }}
        >
          <Avatar sx={{ width: 24, height: 24, padding: "1rem" }}>
            {adminDetails.name
              ? adminDetails.name.charAt(0).toUpperCase()
              : "A"}
          </Avatar>
        </Badge>
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
