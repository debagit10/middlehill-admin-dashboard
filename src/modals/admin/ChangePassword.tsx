import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Icon,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import generateRandomPassword from "../../utils/Password";

import icon from "../../icons/password.png";
import { IoCloseOutline } from "react-icons/io5";

interface AdminDetails {
  name: string;
  email: string;
  role: string;
  password: string;
}

const Suspension = () => {
  const [open, setOpen] = React.useState(false);

  const [adminDetails, setAdminDetails] = useState<AdminDetails>({
    name: "",
    email: "",
    role: "",
    password: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setAdminDetails((prev) => ({ ...prev, [name]: value }));
  };

  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState<string>("");

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
      <React.Fragment>
        <div
          onClick={handleClickOpen}
          className="flex gap-[4px] text-[#344054]"
        >
          <Icon>
            <img className="w-[20px] h-[20px] pt-[2.5px]" src={icon} />
          </Icon>

          <Typography
            fontWeight={600}
            fontSize={14}
            fontFamily="Open Sans, sans-serif"
          >
            Reset password
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
                Reset password
              </Typography>
              <Button sx={{ color: "black" }} onClick={handleClose}>
                <IoCloseOutline className="w-[1.5rem] h-[1.5rem] " />
              </Button>
            </div>
          </DialogTitle>
          <DialogContent sx={{ width: "400px" }}>
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
                  name="role"
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
                  Reset
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
          </DialogContent>
        </Dialog>
      </React.Fragment>
    </div>
  );
};

export default Suspension;
