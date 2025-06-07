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

import { FaBan } from "react-icons/fa";
import { IoCloseOutline } from "react-icons/io5";
import api from "../../utils/axiosInstance";
import Toast from "../../utils/Toast";
import { RiDeviceRecoverFill } from "react-icons/ri";

interface AdminDetails {
  suspended: boolean;
  id?: string;
}

interface ToastState {
  open: boolean;
  message: string;
  severity: "success" | "info" | "error" | "warning";
}

interface SuspendProps {
  adminData: AdminDetails;
  refreshAdmins: () => void;
}

const Suspension: React.FC<SuspendProps> = ({ adminData, refreshAdmins }) => {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(false);

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
      const response = await api.put(
        `api/admin/${adminData.suspended ? "reinstate" : "suspend"}/${
          adminData.id
        }`
      );

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
            {adminData.suspended ? (
              <RiDeviceRecoverFill className="w-[16.76px] h-[16.76px] pt-[2.5px]" />
            ) : (
              <FaBan className="w-[16.76px] h-[16.76px] pt-[2.5px]" />
            )}
          </Icon>

          <Typography
            fontWeight={600}
            fontSize={14}
            fontFamily="Open Sans, sans-serif"
          >
            {adminData.suspended ? "Reinstate" : "Suspend"}
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
                {adminData.suspended ? "Reinstate" : "Suspend"} account
              </Typography>
              <Button sx={{ color: "black" }} onClick={handleClose}>
                <IoCloseOutline className="w-[1.5rem] h-[1.5rem] " />
              </Button>
            </div>
          </DialogTitle>
          <DialogContent sx={{ width: "400px" }}>
            <DialogContentText id="suspend-dialog-description">
              Are you sure you want to{" "}
              {adminData.suspended ? "reinstate" : "suspend"} this admin's
              account? {adminData.suspended ? "Reinstated " : "Suspended "}
              admins will {adminData.suspended ? "HAVE" : "NOT HAVE"} access to
              their account
              {adminData.suspended === false && " until reinstated"}.
            </DialogContentText>
          </DialogContent>

          <div className="p-[20px]">
            <Button
              disabled={loading}
              onClick={submit}
              fullWidth
              variant="outlined"
              sx={{
                borderRadius: "8px",
                backgroundColor: adminData.suspended ? "#E6F4EA" : "#FBE9E9", // Red for suspended, Green for active
                borderColor: adminData.suspended ? "#27AE60" : "#D42620",
                textTransform: "capitalize",
                fontFamily: "Open Sans, sans-serif",
                color: adminData.suspended ? "#27AE60" : "#D42620",
              }}
            >
              {loading
                ? `${
                    adminData.suspended ? "Reinstating" : "Suspending"
                  } account`
                : `${adminData.suspended ? "Reinstate" : "Suspend"} account`}
            </Button>
          </div>
        </Dialog>
      </React.Fragment>
    </div>
  );
};

export default Suspension;
