import { Button, TextField, Typography, InputAdornment } from "@mui/material";
import React, { useState } from "react";
import { VscEyeClosed } from "react-icons/vsc";
import { VscEye } from "react-icons/vsc";

const AuthContainer = React.lazy(() => import("../../container/Login"));

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <AuthContainer>
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
              >
                Forgot password?
              </Typography>
            </div>

            <Button
              variant="contained"
              sx={{
                borderRadius: "8px",
                backgroundColor: "#1358A3",
                textTransform: "capitalize",
                fontFamily: "Open Sans, sans-serif",
              }}
            >
              Login
            </Button>
          </div>
        </div>
      </div>
    </AuthContainer>
  );
};

export default Login;
