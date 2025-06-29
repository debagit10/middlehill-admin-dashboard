import { Typography, Grid, Button } from "@mui/material";
import logo from "../../logo/Logo.png";
import OtpInput from "../../utils/OtpInput";
import React from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/axiosInstance";
import Toast from "../../utils/Toast";

interface ToastState {
  open: boolean;
  message: string;
  severity: "success" | "info" | "error" | "warning";
}

const ResetPassword = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = React.useState<string>("");
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

    navigate("/new-password");
  };

  const adminData = localStorage.getItem("adminData");
  const admin = adminData ? JSON.parse(adminData) : null;

  const submit = async () => {
    setLoading(true);

    try {
      const response = await api.post(`/api/user/verify-otp/`, {
        id: admin.id,
        otp,
      });

      if (response.data) {
        setLoading(false);
        showToast(response.data.success, "success");

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
              Reset Password
            </Typography>
            <Typography
              fontWeight={400}
              sx={{ color: "#475367", fontFamily: "Open Sans, sans-serif" }}
            >
              We sent a 4-digit code to jo***oe@gmail.com.
            </Typography>
          </div>

          <div className="flex flex-col gap-[24px]">
            <OtpInput onChange={(otp) => setOtp(otp)} />
          </div>

          <div>
            <Typography
              fontWeight={400}
              sx={{ color: "#1D2739", fontFamily: "Open Sans, sans-serif" }}
              fontSize={14}
            >
              Resend code in 28s
            </Typography>
          </div>

          <div style={{ display: "flex", gap: "16px" }}>
            {/* Left button: 25% width (like xs=3) */}
            <div style={{ flex: "0 0 25%" }}>
              <Button
                variant="outlined"
                fullWidth
                sx={{
                  borderRadius: "8px",
                  textTransform: "capitalize",
                  fontFamily: "Open Sans, sans-serif",
                  height: "40px",
                }}
                onClick={() => navigate("/forgot-password")}
              >
                Go back
              </Button>
            </div>

            {/* Right button: 75% width (like xs=9) */}
            <div style={{ flex: "0 0 75%" }}>
              <Button
                variant="contained"
                fullWidth
                sx={{
                  borderRadius: "8px",
                  backgroundColor: "#1358A3",
                  textTransform: "capitalize",
                  fontFamily: "Open Sans, sans-serif",
                  height: "40px",
                }}
                onClick={submit}
                disabled={otp.length !== 4 || loading}
              >
                Verify
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
