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

interface AdminDetails {
  name: string;
  email: string;
  role: string;
  password: string;
}

const Add_admin = () => {
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

  return (
    <div>
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
                  onClick={() => {
                    setLoading(true);
                    console.log({ ...adminDetails, password: password });
                  }}
                  fullWidth
                  variant="contained"
                  sx={{
                    borderRadius: "8px",
                    backgroundColor: "#1358A3",
                    textTransform: "capitalize",
                    fontFamily: "Open Sans, sans-serif",
                  }}
                >
                  Sumbit Details
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
