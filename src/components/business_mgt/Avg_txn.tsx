import { Typography } from "@mui/material";
import graph from "../../images/tot_txn.png";

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

const Avg_txn: React.FC<TranactionProps> = ({ transactions }) => {
  const totalTransactions = transactions.length;
  let dailyAvg = 0;

  if (totalTransactions > 0) {
    const dates = transactions.map((txn) => new Date(txn.createdAt));
    const minDate = new Date(Math.min(...dates.map((d) => d.getTime())));
    const maxDate = new Date(Math.max(...dates.map((d) => d.getTime())));

    const dayDiff =
      Math.ceil(
        (maxDate.getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24)
      ) + 1;

    dailyAvg = totalTransactions / (dayDiff || 1);
  }

  return (
    <div className="flex flex-col gap-[11px] border 1px border-[#E5E5E5] py-[12px] px-[15px] rounded-[10px] w-[237px] h-[100px]">
      <Typography
        color="#6C7A93"
        fontWeight={400}
        fontSize={14}
        sx={{ fontFamily: "Open Sans, sans-serif" }}
      >
        Avg. daily transactions
      </Typography>

      <div className="flex justify-between items-center">
        <Typography
          color="#101928"
          fontWeight={600}
          fontSize={32}
          sx={{ fontFamily: "Open Sans, sans-serif" }}
        >
          {dailyAvg}
        </Typography>

        <img src={graph} />
      </div>
    </div>
  );
};

export default Avg_txn;
