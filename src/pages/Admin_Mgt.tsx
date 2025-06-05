import {
  TextField,
  InputAdornment,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Skeleton,
  Box,
} from "@mui/material";
import { FiSearch } from "react-icons/fi";
import Pages from "../container/Pages";
import Add_admin from "../modals/admin/Add_admin";
import Actions from "../components/admin_mgt/Actions";
import api from "../utils/axiosInstance";
import { useEffect, useState } from "react";
import DayAndTime from "../utils/DayAndTime";

interface AdminsState {
  name: string;
  email: string;
  role: string;
  id: string;
  suspended: boolean;
  createdAt: string;
}

const Admin_Mgt = () => {
  const [admins, setAdmins] = useState<AdminsState[]>();
  const [loading, setLoading] = useState<boolean>(true);

  const getAdmins = async () => {
    setLoading(true);
    try {
      const response = await api.get("/api/admin/getAll");

      if (response.data) {
        setAdmins(response.data.admins);
        return;
      }
    } catch (error: any) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAdmins();
  }, []);

  return (
    <Pages page="Admin Management">
      <div className="flex justify-between py-[1rem]">
        <TextField
          placeholder="Search admin"
          size="small"
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px",
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FiSearch />
              </InputAdornment>
            ),
          }}
        />
        <Add_admin />
      </div>

      <TableContainer
        sx={{ borderRadius: "8px", border: "0.5px solid #D0D5DD" }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="admin table" size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#F0F2F5", height: "45px" }}>
              <TableCell>Name</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="left">Role</TableCell>
              <TableCell align="left">Last login</TableCell>
              <TableCell align="left" />
            </TableRow>
          </TableHead>

          <TableBody>
            {loading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index}>
                  {Array.from({ length: 5 }).map((__, idx) => (
                    <TableCell key={idx}>
                      <Skeleton variant="text" width="100%" height={30} />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : admins && admins.length > 0 ? (
              admins.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{
                    height: "50px",
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell component="th" scope="row">
                    <Typography
                      color="#101928"
                      sx={{ fontFamily: "Open Sans, sans-serif" }}
                      fontWeight={500}
                      fontSize={14}
                    >
                      {row.name}
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography
                      color="#344054"
                      sx={{ fontFamily: "Open Sans, sans-serif" }}
                      fontWeight={400}
                      fontSize={14}
                    >
                      {row.email}
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography
                      color="#344054"
                      sx={{ fontFamily: "Open Sans, sans-serif" }}
                      fontWeight={400}
                      fontSize={14}
                    >
                      {row.role}
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography
                      color="#344054"
                      sx={{ fontFamily: "Open Sans, sans-serif" }}
                      fontWeight={400}
                      fontSize={14}
                    >
                      <DayAndTime date={row.createdAt} />
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Actions />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5}>
                  <Box textAlign="center" py={4}>
                    <Typography variant="body1" color="textSecondary">
                      No admins found. Please add an admin.
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Pages>
  );
};

export default Admin_Mgt;
