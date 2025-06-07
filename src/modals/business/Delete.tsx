import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Typography,
  Icon,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoCloseOutline, IoPersonRemove } from "react-icons/io5";
import api from "../../utils/axiosInstance";
import Toast from "../../utils/Toast";

interface BusinessDetails {
  id: string;
  first_name: string;
}

interface DeleteProps {
  businessData: BusinessDetails;
}

interface ToastState {
  open: boolean;
  message: string;
  severity: "success" | "info" | "error" | "warning";
}

const Delete: React.FC<DeleteProps> = ({ businessData }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const onClose = () => {
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
      const response = await api.delete(
        `api/business/delete/${businessData.id}`
      );

      if (response.data) {
        showToast(response.data.success, "success");

        setTimeout(() => {
          navigate("/business-mgt");
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
                Delete confirmation
              </Typography>
              <Button sx={{ color: "black" }} onClick={onClose}>
                <IoCloseOutline className="w-[1.5rem] h-[1.5rem] " />
              </Button>
            </div>
          </DialogTitle>

          <DialogContent sx={{ width: "400px" }}>
            <DialogContentText id="alert-dialog-delete-description">
              Are you sure you want to delete{" "}
              <strong>{`${businessData.first_name}`}</strong>? This action
              cannot be undone.
            </DialogContentText>
          </DialogContent>

          <div className="p-[20px]">
            <Button
              disabled={loading}
              fullWidth
              color="error"
              variant="outlined"
              sx={{ textTransform: "capitalize" }}
              onClick={submit}
            >
              {loading ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </Dialog>
      </React.Fragment>
    </div>
  );
};

export default Delete;
