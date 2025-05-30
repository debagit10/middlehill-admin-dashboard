import { Typography, Grid, Button } from "@mui/material";
import logo from "../../logo/Logo.png";
import OtpInput from "../../utils/OtpInput";
import React from "react";

const ResetPassword = () => {
  const [otp, setOtp] = React.useState<string>("");

  const handleVerify = () => {
    console.log("Submitted OTP:", otp);
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

          <Grid container spacing={2}>
            <Grid item size={3}>
              <Button
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
            </Grid>

            <Grid item size={9}>
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
                onClick={handleVerify}
                disabled={otp.length !== 4}
              >
                Verify
              </Button>
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
