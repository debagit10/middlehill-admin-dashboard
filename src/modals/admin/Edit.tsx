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

interface AdminDetails {
  name: string;
  email: string;
  role: string;
}

const Edit = () => {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(false);

  const [adminDetails, setAdminDetails] = useState<AdminDetails>({
    name: "",
    email: "",
    role: "",
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
    setAdminDetails({ name: "", email: "", role: "" });
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

              <Button
                disabled={loading}
                fullWidth
                variant="contained"
                sx={{
                  borderRadius: "8px",
                  backgroundColor: "#1358A3",
                  textTransform: "capitalize",
                  fontFamily: "Open Sans, sans-serif",
                }}
              >
                Update details
              </Button>
            </div>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Edit;
