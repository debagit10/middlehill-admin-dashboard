import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Icon,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

import { HiUserRemove } from "react-icons/hi";
import { IoCloseOutline } from "react-icons/io5";
import api from "../../utils/axiosInstance";
import Toast from "../../utils/Toast";

interface AdminDetails {
  id?: string;
}

interface ToastState {
  open: boolean;
  message: string;
  severity: "success" | "info" | "error" | "warning";
}

interface DeleteProps {
  adminData: AdminDetails;
  refreshAdmins: () => void;
}

const Remove: React.FC<DeleteProps> = ({ adminData, refreshAdmins }) => {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [toast, setToast] = useState<ToastState>({
    open: false,
    message: "",
    severity: "info",
  });

  const showToast = (message: string, severity: ToastState["severity"]) => {
    setToast({ open: true, message, severity });
  };

  const handleCloseToast = () => {
    setToast((prev) => ({ ...prev, open: false }));
    setLoading(false);
    setOpen(false);
  };

  const submit = async () => {
    setLoading(true);

    try {
      const response = await api.delete(`/api/admin/delete/${adminData.id}`);

      if (response.data) {
        showToast(response.data.success, "success");

        setTimeout(() => {
          refreshAdmins();
        }, 2000);
      }
    } catch (error: any) {
      if (error.response.data.error) {
        console.log(error);
        setLoading(false);
        showToast(error.response.data.error, "error");
        return;
      }
    }
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
            Delete admin
          </Typography>
        </div>

        <Dialog
          open={open}
          keepMounted
          onClose={handleClose}
          aria-describedby="suspend-dialog-description"
        >
          <Toast
            open={toast.open}
            message={toast.message}
            severity={toast.severity}
            onClose={handleCloseToast}
          />
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
              onClick={submit}
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
              {loading ? "Deleting..." : "Delete Admin"}
            </Button>
          </div>
        </Dialog>
      </React.Fragment>
    </div>
  );
};

export default Remove;
