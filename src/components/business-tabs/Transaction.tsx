import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import DayAndTime from "../../utils/DayAndTime";

interface Transactions {
  id: string;
  item_name: string;
  quantity: string;
  amount: number;
  deleted: boolean;
  createdAt: string;
}

interface TransactionProps {
  transactions: Transactions[];
}

const Transaction: React.FC<TransactionProps> = ({ transactions }) => {
  return (
    <div>
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

          {transactions.length > 0 ? (
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow
                  key={transaction.item_name}
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
                      {transaction.id}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      color="#344054"
                      sx={{ fontFamily: "Open Sans, sans-serif" }}
                      fontWeight={400}
                      fontSize={14}
                    >
                      {transaction.item_name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      color="#344054"
                      sx={{ fontFamily: "Open Sans, sans-serif" }}
                      fontWeight={400}
                      fontSize={14}
                    >
                      {transaction.quantity}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      color="#344054"
                      sx={{ fontFamily: "Open Sans, sans-serif" }}
                      fontWeight={400}
                      fontSize={14}
                    >
                      {transaction.amount}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      color="#344054"
                      sx={{ fontFamily: "Open Sans, sans-serif" }}
                      fontWeight={400}
                      fontSize={14}
                    >
                      <DayAndTime date={transaction.createdAt} />
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          ) : (
            <div className="flex justify-center items-center ml-[20rem] my-[5rem]">
              There are no recorded transactions
            </div>
          )}
        </Table>
      </TableContainer>
    </div>
  );
};

export default Transaction;
