import {
  Typography,
  TextField,
  Grid,
  Button,
  InputAdornment,
} from "@mui/material";
import logo from "../../images/logo.png";
import React from "react";
import { VscEye, VscEyeClosed } from "react-icons/vsc";

const NewPassword = () => {
  const [showPassword, setShowPassword] = React.useState(false);
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
          </div>

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
          >
            Submit
          </Button>
        </div>
      </div>
    </>
  );
};

export default NewPassword;
