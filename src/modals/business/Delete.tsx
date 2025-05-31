import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Typography,
  Icon,
} from "@mui/material";
import React from "react";

import { IoPersonRemove } from "react-icons/io5";

const Delete = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const itemName = "John Doe";

  return (
    <div>
      <React.Fragment>
        <div
          onClick={handleClickOpen}
          className="flex gap-[4px] text-[#344054]"
        >
          <Icon>
            <IoPersonRemove
              style={{ stroke: "currentColor", strokeWidth: 2 }}
              className="w-[16.76px] h-[16.76px] pt-[2.5px]"
            />
          </Icon>

          <Typography
            fontWeight={600}
            fontSize={14}
            fontFamily="Open Sans, sans-serif"
          >
            Delete
          </Typography>
        </div>

        <Dialog
          open={open}
          keepMounted
          onClose={onClose}
          aria-describedby="alert-dialog-delete-description"
        >
          <DialogTitle>Delete Confirmation</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-delete-description">
              Are you sure you want to delete <strong>{itemName}</strong>? This
              action cannot be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={onClose}
              sx={{ color: "#1358A3", textTransform: "capitalize" }}
            >
              Cancel
            </Button>
            <Button
              color="error"
              variant="outlined"
              sx={{ textTransform: "capitalize" }}
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </div>
  );
};

export default Delete;
