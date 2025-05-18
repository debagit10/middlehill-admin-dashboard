import { Typography, TextField, Button, Grid } from "@mui/material";
import logo from "../../images/logo.png";

const ForgotPassword = () => {
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

          <div className="flex justify-center">
            <Typography
              fontWeight={400}
              sx={{ color: "#1D2739", fontFamily: "Open Sans, sans-serif" }}
              fontSize={14}
            >
              Remembered your password?{" "}
              <span className="text-blue-800">Login</span>
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
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
