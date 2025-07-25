import { Typography } from "@mui/material";
import graph from "../../images/tot_txn.png";
import type React from "react";

interface Transaction {
  id: string;
  item_name: string;
  quantity: string;
  amount: number;
  deleted: boolean;
  createdAt: string;
}

interface TranactionProps {
  transactions: Transaction[];
}

const Total_transactions: React.FC<TranactionProps> = ({ transactions }) => {
  const totalTransactions = transactions.length;

  return (
    <div className="flex flex-col gap-[11px] border 1px border-[#E5E5E5] py-[12px] px-[15px] rounded-[10px] w-[237px] h-[100px]">
      <Typography
        color="#6C7A93"
        fontWeight={400}
        fontSize={14}
        sx={{ fontFamily: "Open Sans, sans-serif" }}
      >
        Total Transactions
      </Typography>

      <div className="flex justify-between items-center">
        <Typography
          color="#101928"
          fontWeight={600}
          fontSize={32}
          sx={{ fontFamily: "Open Sans, sans-serif" }}
        >
          {totalTransactions}
        </Typography>

        <img src={graph} />
      </div>
    </div>
  );
};

export default Total_transactions;
