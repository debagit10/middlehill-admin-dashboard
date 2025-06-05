import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import generateRandomPassword from "../../utils/Password";

import { IoCloseOutline } from "react-icons/io5";
import { IoAddOutline } from "react-icons/io5";

import { useNavigate } from "react-router-dom";
import api from "../../utils/axiosInstance";
import Toast from "../../utils/Toast";

interface AdminDetails {
  name: string;
  email: string;
  role: string;
  password: string;
}

interface ToastState {
  open: boolean;
  message: string;
  severity: "success" | "info" | "error" | "warning";
}

const Add_admin = () => {
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState<string>("");

  const [adminDetails, setAdminDetails] = useState<AdminDetails>({
    name: "",
    email: "",
    role: "",
    password: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setAdminDetails((prev) => ({ ...prev, [name]: value }));
  };

  const isFormDataComplete = () => {
    return Object.values({ ...adminDetails, password }).every(
      (value) => value.trim() !== ""
    );
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setAdminDetails({ name: "", email: "", password: "", role: "" });
    setPassword("");
  };

  const onGeneratePassword = () => {
    setLoading(true);

    const generatedPassword = generateRandomPassword();

    setTimeout(() => {
      setPassword(generatedPassword);
      setLoading(false);
    }, 1000);
  };

  const [toast, setToast] = useState<ToastState>({
    open: false,
    message: "",
    severity: "info",
  });

  const [redirectAfterToast, setRedirectAfterToast] = useState<string | null>(
    null
  );

  const showToast = (message: string, severity: ToastState["severity"]) => {
    setToast({ open: true, message, severity });
  };

  const handleCloseToast = () => {
    setToast((prev) => ({ ...prev, open: false }));
    setLoading(false);
    handleClose();

    if (redirectAfterToast) {
      navigate(redirectAfterToast);
      setRedirectAfterToast(null);
    }
  };

  const submit = async () => {
    setLoading(true);
    const formReady = isFormDataComplete();

    if (!formReady) {
      setLoading(false);
      showToast("Please input all fields", "warning");
      return;
    }

    try {
      const response = await api.post("/api/admin/add", {
        ...adminDetails,
        password,
      });

      console.log(response.data);

      if (response.data) {
        setLoading(false);
        showToast(response.data.message, "success");
        return;
      }
    } catch (error: any) {
      if (error.response.data.error) {
        setLoading(false);
        showToast(error.response.data.error, "error");
        return;
      }
    }
  };

  return (
    <div>
      <Toast
        open={toast.open}
        message={toast.message}
        severity={toast.severity}
        onClose={handleCloseToast}
      />

      <Button
        sx={{
          borderRadius: "12px",
          backgroundColor: "#1961B5",
          textTransform: "capitalize",
          fontFamily: "Open Sans, sans-serif",
          width: "144px",
          height: "48px",
          color: "#FFFFFF",
        }}
        onClick={handleClickOpen}
        startIcon={<IoAddOutline />}
      >
        Add admin
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>
          <div className="flex justify-between items-center">
            <Typography
              fontWeight={600}
              sx={{ color: "#081421", fontFamily: "Open Sans, sans-serif" }}
              fontSize={24}
            >
              Add Admin
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
                  sx={{ color: "#1D2739", fontFamily: "Open Sans, sans-serif" }}
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
                  sx={{ color: "#1D2739", fontFamily: "Open Sans, sans-serif" }}
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
                  sx={{ color: "#1D2739", fontFamily: "Open Sans, sans-serif" }}
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

              {password && (
                <div>
                  <Typography
                    fontWeight={400}
                    sx={{
                      color: "#1D2739",
                      fontFamily: "Open Sans, sans-serif",
                    }}
                    fontSize={14}
                  >
                    Password
                  </Typography>
                  <TextField
                    name="role"
                    value={password}
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
              )}

              {password ? (
                <Button
                  disabled={loading}
                  onClick={submit}
                  fullWidth
                  variant="contained"
                  sx={{
                    borderRadius: "8px",
                    backgroundColor: "#1358A3",
                    textTransform: "capitalize",
                    fontFamily: "Open Sans, sans-serif",
                  }}
                >
                  {loading ? "Adding..." : "Add admin"}
                </Button>
              ) : (
                <Button
                  disabled={loading}
                  onClick={onGeneratePassword}
                  fullWidth
                  variant="contained"
                  sx={{
                    borderRadius: "8px",
                    backgroundColor: "#1358A3",
                    textTransform: "capitalize",
                    fontFamily: "Open Sans, sans-serif",
                  }}
                >
                  Generate password
                </Button>
              )}
            </div>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Add_admin;
