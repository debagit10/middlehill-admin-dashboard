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
  Chip,
  TablePagination,
} from "@mui/material";
import { FiSearch } from "react-icons/fi";
import Pages from "../container/Pages";
import Add_admin from "../modals/admin/Add_admin";
import Actions from "../components/admin_mgt/Actions";
import api from "../utils/axiosInstance";
import { useEffect, useState, useMemo } from "react";
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

  const [searchQuery, setSearchQuery] = useState<string>("");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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

  let adminId = "";

  const adminString = localStorage.getItem("adminData");
  if (adminString) {
    const admin = JSON.parse(adminString);
    adminId = admin.id;
  }

  console.log(adminId);

  useEffect(() => {
    getAdmins();
  }, []);

  const filteredAdmins = useMemo(() => {
    if (!searchQuery.trim()) return admins;
    return admins?.filter((admin) =>
      `${admin.name} ${admin.email}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, admins]);

  const paginatedAdmins = useMemo(() => {
    const start = page * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredAdmins?.slice(start, end);
  }, [filteredAdmins, page, rowsPerPage]);

  return (
    <Pages page="Admin Management">
      <div className="flex justify-between py-[1rem]">
        <TextField
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
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
              <TableCell align="left">Status</TableCell>
              <TableCell align="left" />
            </TableRow>
          </TableHead>

          <TableBody>
            {loading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index}>
                  {Array.from({ length: 6 }).map((__, idx) => (
                    <TableCell key={idx}>
                      <Skeleton variant="text" width="100%" height={30} />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : paginatedAdmins && paginatedAdmins.length > 0 ? (
              paginatedAdmins.map((row) => (
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
                      {row.name}{" "}
                      {row.id === adminId && (
                        <span className="text-sm text-gray-500">(you)</span>
                      )}
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
                    <Chip
                      label={row.suspended ? "Suspended" : "Active"}
                      sx={{
                        backgroundColor: row.suspended ? "#FEEDE6" : "#E6F4EA",
                        color: row.suspended ? "#D33E08" : "#27AE60",
                        fontWeight: 600,
                        fontSize: "14px",
                        fontFamily: "Open Sans, sans-serif",
                      }}
                    />
                  </TableCell>
                  {row.id !== adminId && (
                    <TableCell align="left">
                      <Actions adminDetails={row} refreshAdmins={getAdmins} />
                    </TableCell>
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6}>
                  <Box textAlign="center" py={4}>
                    <Typography variant="body1" color="textSecondary">
                      {searchQuery
                        ? "No matching admins found."
                        : "No admins found. Please add an admin."}
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10]}
        component="div"
        count={filteredAdmins?.length || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Pages>
  );
};

export default Admin_Mgt;
