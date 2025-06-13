import { Avatar, Button, TextField, Typography } from "@mui/material";
import { IoIosArrowRoundBack } from "react-icons/io";
import Pages from "../container/Pages";
import { HiPhoto } from "react-icons/hi2";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../utils/axiosInstance";
import Toast from "../utils/Toast";

interface AdminData {
  name: string;
  email: string;
  role: string;
  password: string;
  phone_number: string;
}

interface ToastState {
  open: boolean;
  message: string;
  severity: "success" | "info" | "error" | "warning";
}

const Profile = () => {
  const navigate = useNavigate();

  let storedAdminData: any = null;

  const [loading, setLoading] = useState(false);

  const [adminDetails, setAdminDetails] = useState<AdminData>({
    name: "",
    email: "",
    role: "",
    password: "",
    phone_number: "",
  });

  const [originalAdminData, setOriginalAdminData] = useState<AdminData>({
    name: "",
    email: "",
    role: "",
    password: "",
    phone_number: "",
  });

  const getAdminData = () => {
    const stored = localStorage.getItem("adminData");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setAdminDetails(parsed);
        setOriginalAdminData(parsed);
      } catch (err) {
        console.error("Failed to parse admin data from localStorage:", err);
      }
    }
  };

  const isUnchanged = () => {
    return (
      adminDetails.name === originalAdminData.name &&
      adminDetails.email === originalAdminData.email &&
      adminDetails.role === originalAdminData.role &&
      adminDetails.phone_number === originalAdminData.phone_number
    );
  };

  const getChangedFields = () => {
    const changed: Record<string, any> = {};
    Object.keys(adminDetails).forEach((key) => {
      if ((adminDetails as any)[key] !== (originalAdminData as any)[key]) {
        changed[key] = (adminDetails as any)[key];
      }
    });
    return changed;
  };

  const changedFields = getChangedFields();

  const [toast, setToast] = useState<ToastState>({
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setAdminDetails((prev) => ({ ...prev, [name]: value }));
  };

  const submit = async () => {
    try {
      setLoading(true);
      const response = await api.put(
        `api/admin/edit/${storedAdminData.id}`,
        changedFields
      );

      if (response.data.success) {
        showToast(response.data.success, "success");
      }
    } catch (error: any) {
      if (error.response.data.error) {
        console.log(error);
        setLoading(false);
        showToast(error.response.data.error, "error");
        return;
      }
    }
  };

  useEffect(() => {
    getAdminData();
  }, []);

  return (
    <Pages page="Profile">
      <Toast
        open={toast.open}
        message={toast.message}
        severity={toast.severity}
        onClose={handleCloseToast}
      />

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
            <Avatar sx={{ width: 100, height: 100 }}>
              {adminDetails.name
                ? adminDetails.name.charAt(0).toUpperCase()
                : "A"}
            </Avatar>
          </div>
          {/* <div className="flex flex-col gap-[10px]">
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
          </div> */}

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

            <Button
              onClick={submit}
              disabled={loading || isUnchanged()}
              fullWidth
              variant="contained"
              disableElevation
              sx={{
                borderRadius: "8px",
                backgroundColor: "#1358A3",
                textTransform: "capitalize",
                fontFamily: "Open Sans, sans-serif",
              }}
            >
              {loading ? "Updating..." : "Update details"}
            </Button>
          </div>
        </div>

        <div className="flex gap-[56px]">
          <div className="flex flex-col gap-[20px] w-[600px]">
            <div>
              <Typography
                fontWeight={600}
                sx={{ color: "#101928", fontFamily: "Open Sans, sans-serif" }}
                fontSize={16}
              >
                Name
              </Typography>
              <TextField
                value={adminDetails.name}
                onChange={handleChange}
                name="name"
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
                Email
              </Typography>
              <TextField
                value={adminDetails.email}
                onChange={handleChange}
                name="email"
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
                value={adminDetails.phone_number}
                onChange={handleChange}
                name="phone_number"
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
                disabled
                value={adminDetails.role}
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
