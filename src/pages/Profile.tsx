import { Avatar, Button, TextField, Typography } from "@mui/material";
import { IoIosArrowRoundBack } from "react-icons/io";
import Pages from "../container/Pages";
import { HiPhoto } from "react-icons/hi2";

import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  return (
    <Pages page="Profile">
      <div className="flex flex-col gap-[3rem] p-[1rem]">
        <div>
          <Button
            variant="outlined"
            onClick={() => navigate("/dashboard")}
            sx={{
              borderRadius: "8px",
              textTransform: "capitalize",
              fontFamily: "Open Sans, sans-serif",
              height: "40px",
              border: "1px solid #E4E7EC",
              padding: "10px",
              color: "#101928",
              fontWeight: 600,
              fontSize: "14px",
            }}
            startIcon={<IoIosArrowRoundBack />}
          >
            Go back to dashboard
          </Button>
        </div>

        <div className="flex gap-[56px]">
          <div>
            <Avatar sx={{ width: 100, height: 100 }}>JD</Avatar>
          </div>
          <div className="flex flex-col gap-[10px]">
            <Typography
              fontWeight={600}
              sx={{ color: "#101928", fontFamily: "Open Sans, sans-serif" }}
              fontSize={16}
            >
              Profile photo
            </Typography>
            <Typography
              fontWeight={400}
              sx={{ color: "#344054", fontFamily: "Open Sans, sans-serif" }}
              fontSize={14}
            >
              This image will be displayed <br /> on your profile
            </Typography>

            <Button
              variant="outlined"
              sx={{
                textTransform: "capitalize",
                border: "1.25px solid #1358A3",
                color: "#1358A3",
                borderRadius: "10px",
                padding: "10px",
              }}
              startIcon={<HiPhoto />}
            >
              Change photo
            </Button>
          </div>
        </div>

        <div className="flex gap-[56px]">
          <div className="flex flex-col gap-[6px]">
            <Typography
              fontWeight={600}
              sx={{ color: "#101928", fontFamily: "Open Sans, sans-serif" }}
              fontSize={16}
            >
              Personal Information
            </Typography>
            <Typography
              fontWeight={400}
              sx={{ color: "#344054", fontFamily: "Open Sans, sans-serif" }}
              fontSize={14}
            >
              Update your personal details here
            </Typography>
          </div>

          <div className="flex flex-col gap-[20px]">
            <div className="flex gap-[20px]">
              <div>
                <Typography
                  fontWeight={600}
                  sx={{ color: "#101928", fontFamily: "Open Sans, sans-serif" }}
                  fontSize={16}
                >
                  First name
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
                  fontWeight={600}
                  sx={{ color: "#101928", fontFamily: "Open Sans, sans-serif" }}
                  fontSize={16}
                >
                  Last name
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

            <div>
              <Typography
                fontWeight={600}
                sx={{ color: "#101928", fontFamily: "Open Sans, sans-serif" }}
                fontSize={16}
              >
                Email
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
                fontWeight={600}
                sx={{ color: "#101928", fontFamily: "Open Sans, sans-serif" }}
                fontSize={16}
              >
                Phone number
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
                fontWeight={600}
                sx={{ color: "#101928", fontFamily: "Open Sans, sans-serif" }}
                fontSize={16}
              >
                Role
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
        </div>
      </div>
    </Pages>
  );
};

export default Profile;
