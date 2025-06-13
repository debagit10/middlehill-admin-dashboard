import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Icon,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

import { CiLogout } from "react-icons/ci";
import { IoCloseOutline } from "react-icons/io5";

interface LogoutProps {
  color: string;
}

const Logout: React.FC<LogoutProps> = (color) => {
  const navigate = useNavigate();

  const [open, setOpen] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const logout = () => {
    setLoading(true);

    setTimeout(() => {
      navigate("/");
      localStorage.removeItem("accessToken");
    }, 2000);
  };

  return (
    <div>
      <React.Fragment>
        <div
          onClick={handleClickOpen}
          className={`flex gap-[4px] items-center ${color} cursor-pointer`}
        >
          <Icon>
            <CiLogout size={20} className="pt-[2.5px]" />
          </Icon>

          <Typography
            fontWeight={400}
            fontSize={14}
            fontFamily="Open Sans, sans-serif"
          >
            Log out
          </Typography>
        </div>

        <Dialog
          open={open}
          keepMounted
          onClose={handleClose}
          aria-describedby="logout-dialog-description"
        >
          <DialogTitle>
            <div className="flex justify-between items-center">
              <Typography
                fontWeight={600}
                sx={{ color: "#081421", fontFamily: "Open Sans, sans-serif" }}
                fontSize={24}
              >
                Log out
              </Typography>
              <Button sx={{ color: "black" }} onClick={handleClose}>
                <IoCloseOutline className="w-[1.5rem] h-[1.5rem] " />
              </Button>
            </div>
          </DialogTitle>
          <DialogContent sx={{ width: "379px" }}>
            <DialogContentText id="logout-dialog-description">
              Are you sure you want to log out? You will need to log in again to
              access your account.
            </DialogContentText>
          </DialogContent>

          <div className="p-[20px]">
            <Button
              disabled={loading}
              onClick={logout}
              fullWidth
              variant="outlined"
              sx={{
                borderRadius: "8px",
                backgroundColor: "#FBE9E9",
                borderColor: "#D42620",
                textTransform: "capitalize",
                fontFamily: "Open Sans, sans-serif",
                color: "#D42620",
              }}
            >
              {loading ? "Logging out..." : "Log out"}
            </Button>
          </div>
        </Dialog>
      </React.Fragment>
    </div>
  );
};

export default Logout;
