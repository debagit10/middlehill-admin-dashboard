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

import { HiUserRemove } from "react-icons/hi";
import { IoCloseOutline } from "react-icons/io5";

const Remove = () => {
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
            <HiUserRemove className="w-[20px] h-[20px] pt-[2.5px]" />
          </Icon>

          <Typography
            fontWeight={600}
            fontSize={14}
            fontFamily="Open Sans, sans-serif"
          >
            Deactivate
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
                Deactivate admin
              </Typography>
              <Button sx={{ color: "black" }} onClick={handleClose}>
                <IoCloseOutline className="w-[1.5rem] h-[1.5rem] " />
              </Button>
            </div>
          </DialogTitle>
          <DialogContent sx={{ width: "379px" }}>
            <DialogContentText id="suspend-dialog-description">
              This account will be deleted and admin deactivated. Action{" "}
              <span className="font-extrabold">CANNOT</span> be reversed.
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
              Deactivate account
            </Button>
          </div>
        </Dialog>
      </React.Fragment>
    </div>
  );
};

export default Remove;
