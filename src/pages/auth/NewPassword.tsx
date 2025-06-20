import { Typography, TextField, Button, InputAdornment } from "@mui/material";
import logo from "../../logo/logo.png";
import React from "react";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import Toast from "../../utils/Toast";
import api from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

interface ToastState {
  open: boolean;
  message: string;
  severity: "success" | "info" | "error" | "warning";
}

const NewPassword = () => {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = React.useState<string>("");
  const [confirmNewPassword, setConfirmNewPassword] =
    React.useState<string>("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfrimPassword, setShowConfrimPassword] = React.useState(false);

  const [loading, setLoading] = React.useState<boolean>(false);

  const [toast, setToast] = React.useState<ToastState>({
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
  };

  const adminData = localStorage.getItem("adminData");
  const admin = adminData ? JSON.parse(adminData) : null;

  const submit = async () => {
    setLoading(true);

    if (!newPassword || !confirmNewPassword) {
      showToast("Please fill all fields", "warning");
      setLoading(false);
      return;
    }

    if (newPassword !== confirmNewPassword) {
      showToast("Passwords do not match", "warning");
      setLoading(false);
      return;
    }

    try {
      const response = await api.put(`/api/admin/reset-password/${admin.id}`, {
        newPassword,
      });

      if (response.data) {
        setLoading(false);
        showToast("Password changed. Login with new password", "success");

        setTimeout(() => {
          navigate("/");
        }, 2000);

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
    <>
      <div className="flex gap-[4px] justify-center items-center h-[70px] ">
        <img className="h-[21.5px] w-[28.41px]" src={logo} alt="logo" />
        <Typography
          fontWeight={600}
          sx={{ fontFamily: "Open Sans, sans-serif" }}
        >
          Mid'hill Cash Flow
        </Typography>
      </div>

      <Toast
        open={toast.open}
        message={toast.message}
        severity={toast.severity}
        onClose={handleCloseToast}
      />

      <div className="flex justify-center items-center h-[90vh] bg-[#F7F9FC]">
        <div className="bg-[white] w-[602px] h-[361px] gap-[20px] flex flex-col p-[40px]">
          <div className="flex flex-col gap-[12px]">
            <Typography
              fontWeight={600}
              sx={{ fontFamily: "Open Sans, sans-serif" }}
              fontSize={28}
            >
              Enter new password
            </Typography>
          </div>

          <div className="flex flex-col gap-[24px]">
            <div>
              <Typography
                fontWeight={400}
                sx={{ color: "#1D2739", fontFamily: "Open Sans, sans-serif" }}
                fontSize={14}
              >
                Enter password
              </Typography>
              <TextField
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                size="small"
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                  },
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      {showPassword ? (
                        <VscEye
                          size={20}
                          className="text-[#A0AAB2] cursor-pointer"
                          onClick={() => setShowPassword(false)}
                        />
                      ) : (
                        <VscEyeClosed
                          size={20}
                          className="text-[#A0AAB2] cursor-pointer"
                          onClick={() => setShowPassword(true)}
                        />
                      )}
                    </InputAdornment>
                  ),
                }}
              />
            </div>

            <div>
              <Typography
                fontWeight={400}
                sx={{ color: "#1D2739", fontFamily: "Open Sans, sans-serif" }}
                fontSize={14}
              >
                Confirm password
              </Typography>
              <TextField
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                type={showConfrimPassword ? "text" : "password"}
                size="small"
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                  },
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      {showPassword ? (
                        <VscEye
                          size={20}
                          className="text-[#A0AAB2] cursor-pointer"
                          onClick={() => setShowConfrimPassword(false)}
                        />
                      ) : (
                        <VscEyeClosed
                          size={20}
                          className="text-[#A0AAB2] cursor-pointer"
                          onClick={() => setShowConfrimPassword(true)}
                        />
                      )}
                    </InputAdornment>
                  ),
                }}
              />
            </div>
          </div>

          <Button
            onClick={submit}
            disabled={loading}
            variant="contained"
            fullWidth
            sx={{
              borderRadius: "8px",
              backgroundColor: "#1358A3",
              textTransform: "capitalize",
              fontFamily: "Open Sans, sans-serif",
              height: "40px",
            }}
          >
            Submit
          </Button>
        </div>
      </div>
    </>
  );
};

export default NewPassword;
