import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  Button,
  Chip,
  Typography,
} from "@mui/material";
import Pages from "../container/Pages";

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
      <div className="flex justify-end py-[3rem]">
        <div className="flex gap-[8px]">
          <TextField placeholder="Search here..." size="small" />
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
            Filter
          </Button>
        </div>
      </div>

      <TableContainer sx={{ borderRadius: "8px", border: "1px solid #D0D5DD" }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table" size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#F0F2F5", height: "45px" }}>
              <TableCell>Name</TableCell>
              <TableCell align="left">Address</TableCell>
              <TableCell align="left">Transactions</TableCell>
              <TableCell align="left">Accuracy</TableCell>
              <TableCell align="left">Status</TableCell>
              <TableCell align="left">Options</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{
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
                <TableCell />
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Pages>
  );
};

export default Business_Mgt;
