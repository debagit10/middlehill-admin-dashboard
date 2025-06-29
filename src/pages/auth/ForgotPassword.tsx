import { Typography, TextField, Button } from "@mui/material";
import logo from "../../logo/Logo.png";
import React from "react";
import { useNavigate } from "react-router-dom";
import Toast from "../../utils/Toast";
import api from "../../utils/axiosInstance";

interface ToastState {
  open: boolean;
  message: string;
  severity: "success" | "info" | "error" | "warning";
}

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

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

    navigate("/reset-password");
  };

  const submit = async () => {
    setLoading(true);

    try {
      const response = await api.post("/api/admin/forgot-password", { email });

      if (response.data) {
        setLoading(false);
        showToast(response.data.message, "success");

        console.log(response.data.otp);

        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("adminData", JSON.stringify(response.data.admin));
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
              Forgot Password
            </Typography>
            <Typography
              fontWeight={400}
              sx={{ color: "#475367", fontFamily: "Open Sans, sans-serif" }}
            >
              Enter your registered email address to reset your password
            </Typography>
          </div>

          <div className="flex flex-col gap-[24px]">
            <div>
              <Typography
                fontWeight={400}
                sx={{ color: "#1D2739", fontFamily: "Open Sans, sans-serif" }}
                fontSize={14}
              >
                Email address
              </Typography>
              <TextField
                name="email"
                onChange={handleEmailChange}
                value={email}
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
          </div>

          <div style={{ display: "flex", gap: "16px" }}>
            <div style={{ flex: "0 0 25%" }}>
              <Button
                onClick={() => navigate("/")}
                variant="outlined"
                fullWidth
                sx={{
                  borderRadius: "8px",
                  textTransform: "capitalize",
                  fontFamily: "Open Sans, sans-serif",
                  height: "40px",
                }}
              >
                Go back
              </Button>
            </div>

            <div style={{ flex: "0 0 75%" }}>
              <Button
                disabled={!email || loading}
                onClick={submit}
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
                {loading ? "Sending otp..." : "Send OTP"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
