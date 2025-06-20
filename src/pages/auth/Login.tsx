import { Button, TextField, Typography, InputAdornment } from "@mui/material";
import React, { useState } from "react";
import { VscEyeClosed } from "react-icons/vsc";
import { VscEye } from "react-icons/vsc";
import Toast from "../../utils/Toast";
import api from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

const AuthContainer = React.lazy(() => import("../../container/Login"));

interface LoginDetails {
  email: string;
  password: string;
}

interface ToastState {
  open: boolean;
  message: string;
  severity: "success" | "info" | "error" | "warning";
}

const Login = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [loginDetails, setDetails] = useState<LoginDetails>({
    email: "",
    password: "",
  });

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

    if (redirectAfterToast) {
      navigate(redirectAfterToast);
      setRedirectAfterToast(null);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setDetails((prev) => ({ ...prev, [name]: value }));
  };

  const isFormDataComplete = () => {
    return Object.values(loginDetails).every((value) => value.trim() !== "");
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
      const response = await api.post("/api/admin/login", loginDetails);

      if (response.data) {
        setLoading(false);
        showToast(response.data.message, "success");
        setRedirectAfterToast("/dashboard");

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
    <AuthContainer>
      <Toast
        open={toast.open}
        message={toast.message}
        severity={toast.severity}
        onClose={handleCloseToast}
      />

      <div className="flex justify-center items-center h-[90vh]">
        <div className="bg-[white] w-[602px] h-[484px] gap-[40px] flex flex-col p-[40px]">
          <div className="flex flex-col gap-[12px]">
            <Typography
              fontWeight={600}
              sx={{ fontFamily: "Open Sans, sans-serif" }}
              fontSize={28}
            >
              Admin Login
            </Typography>
            <Typography
              fontWeight={400}
              sx={{ color: "#475367", fontFamily: "Open Sans, sans-serif" }}
            >
              Enter you details to access your account
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
                onChange={handleChange}
                value={loginDetails.email}
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
                Password
              </Typography>
              <TextField
                name="password"
                onChange={handleChange}
                value={loginDetails.password}
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

            <div className="flex justify-between">
              <div className="flex gap-[4px]">
                <input type="checkbox" />
                <Typography
                  fontWeight={400}
                  sx={{ color: "#1D2739", fontFamily: "Open Sans, sans-serif" }}
                  fontSize={14}
                >
                  Remember me
                </Typography>
              </div>

              <Typography
                fontWeight={400}
                sx={{ color: "#1D2739", fontFamily: "Open Sans, sans-serif" }}
                fontSize={14}
                onClick={() => navigate("/forgot-password")}
                className="cursor-pointer hover:underline"
              >
                Forgot password?
              </Typography>
            </div>

            <Button
              disabled={loading}
              onClick={submit}
              variant="contained"
              disableElevation
              sx={{
                borderRadius: "8px",
                backgroundColor: "#1358A3",
                textTransform: "capitalize",
                fontFamily: "Open Sans, sans-serif",
              }}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </div>
        </div>
      </div>
    </AuthContainer>
  );
};

export default Login;
