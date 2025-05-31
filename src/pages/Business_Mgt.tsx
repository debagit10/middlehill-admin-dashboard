import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  Button,
  Chip,
  Typography,
  InputAdornment,
} from "@mui/material";
import Pages from "../container/Pages";
import { FiSearch } from "react-icons/fi";
import { FiFilter } from "react-icons/fi";
import Actions from "../components/business_mgt/Actions";

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

const Business_Mgt = () => {
  return (
    <Pages page="Business Management">
      <div className="flex justify-between py-[1rem]">
        <TextField
          placeholder="Search business"
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
        <Button
          sx={{
            paddingY: "8px",
            paddingX: "16px",
            textTransform: "capitalize",
            color: "black",
            borderRadius: "8px",
            border: "1px solid #E7E9EB",
          }}
        >
          <div className="flex gap-[8px] text-[#344054]">
            <FiFilter className="pt-[3px] w-[16.76px] h-[16.76px]" />
            <Typography
              fontSize={14}
              fontWeight={400}
              fontFamily="Open Sans, sans-serif"
            >
              Filter
            </Typography>
          </div>
        </Button>
      </div>

      <TableContainer
        sx={{ borderRadius: "8px", border: "0.5px solid #D0D5DD" }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table" size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#F0F2F5", height: "45px" }}>
              <TableCell>Name</TableCell>
              <TableCell align="left">Address</TableCell>
              <TableCell align="left">Transactions</TableCell>
              <TableCell align="left">Accuracy</TableCell>
              <TableCell align="left">Status</TableCell>
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
                  "&:hover": {
                    cursor: "pointer",
                  },
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
                  <Chip
                    label={row.status}
                    sx={{
                      backgroundColor:
                        row.status === "Active" ? "#E6F4EA" : "#FEEDE6",
                      color: row.status === "Active" ? "#27AE60" : "#D33E08",
                      fontWeight: 600,
                      fontSize: "14px",
                      fontFamily: "Open Sans, sans-serif",
                    }}
                  />
                </TableCell>
                <TableCell>
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

export default Business_Mgt;
