import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Icon,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { RiEdit2Fill } from "react-icons/ri";
import { IoCloseOutline } from "react-icons/io5";
import Toast from "../../utils/Toast";
import api from "../../utils/axiosInstance";

interface AdminDetails {
  name: string;
  email: string;
  role: string;
  id?: string;
}

interface ToastState {
  open: boolean;
  message: string;
  severity: "success" | "info" | "error" | "warning";
}

interface EditProps {
  adminData: AdminDetails;
  refreshAdmins: () => void;
}

const Edit: React.FC<EditProps> = ({ adminData, refreshAdmins }) => {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(false);

  const [adminDetails, setAdminDetails] = useState<AdminDetails>({
    name: adminData.name,
    email: adminData.email,
    role: adminData.role,
  });

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setAdminDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setAdminDetails({
      name: adminData.name,
      email: adminData.email,
      role: adminData.role,
    });
  };

  const isUnchanged = () => {
    return (
      adminDetails.name === adminData.name &&
      adminDetails.email === adminData.email &&
      adminDetails.role === adminData.role
    );
  };

  const getChangedFields = (
    original: Record<string, any>,
    updated: Record<string, any>
  ) => {
    const changed: Record<string, any> = {};
    Object.keys(updated).forEach((key) => {
      if (updated[key] !== original[key]) {
        changed[key] = updated[key];
      }
    });
    return changed;
  };

  const changedFields = getChangedFields(adminData, adminDetails);

  const submit = async () => {
    try {
      setLoading(true);
      const response = await api.put(
        `api/admin/edit/${adminData.id}`,
        changedFields
      );

      if (response.data.success) {
        showToast(response.data.success, "success");
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
      <div onClick={handleClickOpen} className="flex gap-[4px] text-[#344054]">
        <Icon>
          <RiEdit2Fill className="w-[20px] h-[20px] pt-[2.5px]" />
        </Icon>

        <Typography
          fontWeight={600}
          fontSize={14}
          fontFamily="Open Sans, sans-serif"
        >
          Edit
        </Typography>
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
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
              Edit admin
            </Typography>
            <Button sx={{ color: "black" }} onClick={handleClose}>
              <IoCloseOutline className="w-[1.5rem] h-[1.5rem] " />
            </Button>
          </div>
        </DialogTitle>
        <DialogContent sx={{ width: "550px" }}>
          <Box sx={{ width: "100%" }}>
            <div className="flex flex-col gap-[15px]">
              <div>
                <Typography
                  fontWeight={400}
                  sx={{
                    color: "#1D2739",
                    fontFamily: "Open Sans, sans-serif",
                  }}
                  fontSize={14}
                >
                  Email
                </Typography>
                <TextField
                  name="email"
                  value={adminDetails.email}
                  onChange={handleChange}
                  type="text"
                  size="small"
                  fullWidth
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "8px",
                    },
                  }}
                />
              </div>

              <div>
                <Typography
                  fontWeight={400}
                  sx={{
                    color: "#1D2739",
                    fontFamily: "Open Sans, sans-serif",
                  }}
                  fontSize={14}
                >
                  Name
                </Typography>
                <TextField
                  name="name"
                  value={adminDetails.name}
                  onChange={handleChange}
                  type="text"
                  size="small"
                  fullWidth
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "8px",
                    },
                  }}
                />
              </div>

              <div>
                <Typography
                  fontWeight={400}
                  sx={{
                    color: "#1D2739",
                    fontFamily: "Open Sans, sans-serif",
                  }}
                  fontSize={14}
                >
                  Role
                </Typography>
                <TextField
                  name="role"
                  value={adminDetails.role}
                  onChange={handleChange}
                  type="text"
                  size="small"
                  fullWidth
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "8px",
                    },
                  }}
                />
              </div>

              <Button
                onClick={submit}
                disabled={loading || isUnchanged()}
                fullWidth
                variant="contained"
                sx={{
                  borderRadius: "8px",
                  backgroundColor: "#1358A3",
                  textTransform: "capitalize",
                  fontFamily: "Open Sans, sans-serif",
                }}
              >
                {loading ? "Updating..." : "Update details"}
              </Button>
            </div>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Edit;
