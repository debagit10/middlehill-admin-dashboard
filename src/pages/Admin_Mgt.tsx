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
} from "@mui/material";
import { FiSearch } from "react-icons/fi";
import Pages from "../container/Pages";
import Add_admin from "../modals/admin/Add_admin";
import Actions from "../components/admin_mgt/Actions";

const rows = [
  {
    name: "John Doe",
    address: "123 Main St",
    transactions: "100",
    accuracy: "95%",
    status: "Active",
  },
  {
    name: "John Doe",
    address: "123 Main St",
    transactions: "100",
    accuracy: "95%",
    status: "Suspended",
  },
];

const Admin_Mgt = () => {
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
        <Table sx={{ minWidth: 650 }} aria-label="simple table" size="small">
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
            {rows.map((row) => (
              <TableRow
                key={row.name}
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
                    {row.address}
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography
                    color="#344054"
                    sx={{ fontFamily: "Open Sans, sans-serif" }}
                    fontWeight={400}
                    fontSize={14}
                  >
                    {row.transactions}
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography
                    color="#344054"
                    sx={{ fontFamily: "Open Sans, sans-serif" }}
                    fontWeight={400}
                    fontSize={14}
                  >
                    {row.accuracy}
                  </Typography>
                </TableCell>

                <TableCell align="left">
                  <Actions />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Pages>
  );
};

export default Admin_Mgt;
