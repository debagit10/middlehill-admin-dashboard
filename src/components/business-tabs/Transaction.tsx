import {
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import DayAndTime from "../../utils/DayAndTime";

const rows = [
  {
    item_name: "Rice",
    quantity: "2 Dericas",
    amount: "100",
    id: "9dcb7c21-8183-49c0-96fe-1179fc6346bb",
    date: "2025-04-25T23:27:55.864Z",
  },
  {
    item_name: "Rice",
    quantity: "2 Dericas",
    amount: "100",
    id: "9dcb7c21-8183-49c0-96fe-1179fc6346bb",
    date: "2025-04-25T23:27:55.864Z",
  },
];

const Transaction = () => {
  return (
    <div>
      <div className="flex gap-[12px] items-center mb-[1rem]">
        <Avatar>
          <Typography
            fontSize={18}
            fontWeight={600}
            fontFamily="Open Sans, sans-serif"
            color="#101928"
          >
            JD
          </Typography>
        </Avatar>
        <Typography
          fontSize={28}
          fontWeight={600}
          fontFamily="Open Sans, sans-serif"
          color="#101928"
        >
          John Doe
        </Typography>
      </div>
      <TableContainer
        sx={{ borderRadius: "8px", border: "0.5px solid #D0D5DD" }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table" size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#F0F2F5", height: "45px" }}>
              <TableCell>Transaction ID</TableCell>
              <TableCell>Item</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.item_name}
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
                    {row.id}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    color="#344054"
                    sx={{ fontFamily: "Open Sans, sans-serif" }}
                    fontWeight={400}
                    fontSize={14}
                  >
                    {row.item_name}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    color="#344054"
                    sx={{ fontFamily: "Open Sans, sans-serif" }}
                    fontWeight={400}
                    fontSize={14}
                  >
                    {row.quantity}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    color="#344054"
                    sx={{ fontFamily: "Open Sans, sans-serif" }}
                    fontWeight={400}
                    fontSize={14}
                  >
                    {row.amount}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    color="#344054"
                    sx={{ fontFamily: "Open Sans, sans-serif" }}
                    fontWeight={400}
                    fontSize={14}
                  >
                    <DayAndTime date={row.date} />
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Transaction;
