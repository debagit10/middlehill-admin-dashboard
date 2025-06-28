import {
  // TableContainer,
  // Table,
  // TableHead,
  // TableRow,
  // TableCell,
  // TableBody,
  Typography,
  //Chip,
} from "@mui/material";
// import DayAndTime from "../../utils/DayAndTime";

// const rows = [
//   {
//     retrieved: "2025-04-25T23:27:55.864Z",
//     status: false,
//     count: 150,
//   },
//   {
//     retrieved: "2025-04-25T23:27:55.864Z",
//     status: true,
//     count: 150,
//   },
// ];

import { CiWarning } from "react-icons/ci";

const Statement = () => {
  return (
    <div>
      {/* <TableContainer
        sx={{ borderRadius: "8px", border: "0.5px solid #D0D5DD" }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table" size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#F0F2F5", height: "45px" }}>
              <TableCell align="left">Retrieved On</TableCell>
              <TableCell align="left">Transactions</TableCell>
              <TableCell align="left">Status</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.retrieved}
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
                    <DayAndTime date={row.retrieved} />
                  </Typography>
                </TableCell>

                <TableCell component="th" scope="row">
                  <Typography
                    color="#101928"
                    sx={{ fontFamily: "Open Sans, sans-serif" }}
                    fontWeight={500}
                    fontSize={14}
                  >
                    {row.count}
                  </Typography>
                </TableCell>

                <TableCell align="left">
                  <Chip
                    label={row.status === true ? "Done" : "Not analyzed"}
                    sx={{
                      backgroundColor:
                        row.status === true ? "#E6F4EA" : "#FEEDE6",
                      color: row.status === true ? "#27AE60" : "#D33E08",
                      fontWeight: 600,
                      fontSize: "14px",
                      fontFamily: "Open Sans, sans-serif",
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> */}

      <div className="flex justify-center items-center flex-col gap-[3rem]">
        <CiWarning size={200} color="yellow" />
        <Typography>
          This tab is not functional yet. Please bear with us
        </Typography>
      </div>
    </div>
  );
};

export default Statement;
