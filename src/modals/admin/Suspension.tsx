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

import { FaBan } from "react-icons/fa";
import { IoCloseOutline } from "react-icons/io5";

const Suspension = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <React.Fragment>
        <div
          onClick={handleClickOpen}
          className="flex gap-[4px] text-[#344054]"
        >
          <Icon>
            <FaBan className="w-[16.76px] h-[16.76px] pt-[2.5px]" />
          </Icon>

          <Typography
            fontWeight={600}
            fontSize={14}
            fontFamily="Open Sans, sans-serif"
          >
            Suspend
          </Typography>
        </div>

        <Dialog
          open={open}
          keepMounted
          onClose={handleClose}
          aria-describedby="suspend-dialog-description"
        >
          <DialogTitle>
            <div className="flex justify-between items-center">
              <Typography
                fontWeight={600}
                sx={{ color: "#081421", fontFamily: "Open Sans, sans-serif" }}
                fontSize={24}
              >
                Suspend account
              </Typography>
              <Button sx={{ color: "black" }} onClick={handleClose}>
                <IoCloseOutline className="w-[1.5rem] h-[1.5rem] " />
              </Button>
            </div>
          </DialogTitle>
          <DialogContent sx={{ width: "400px" }}>
            <DialogContentText id="suspend-dialog-description">
              Are you sure you want to suspend this admin account? Suspended
              admins will not have access to their account until reinstated.
            </DialogContentText>
          </DialogContent>

          <div className="p-[20px]">
            <Button
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
              Suspend account
            </Button>
          </div>
        </Dialog>
      </React.Fragment>
    </div>
  );
};

export default Suspension;
