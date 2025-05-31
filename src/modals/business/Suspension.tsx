import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Icon,
  Typography,
} from "@mui/material";
import React from "react";

import { FaBan } from "react-icons/fa";

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
          <DialogTitle>{"Suspend User Account?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="suspend-dialog-description">
              Are you sure you want to suspend this user account? Suspended
              users will not be able to access their account until reactivated.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleClose}
              sx={{ color: "#1358A3", textTransform: "capitalize" }}
            >
              Cancel
            </Button>
            <Button
              color="error"
              variant="outlined"
              sx={{ textTransform: "capitalize" }}
            >
              Suspend
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </div>
  );
};

export default Suspension;
