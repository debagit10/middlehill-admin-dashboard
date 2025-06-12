import { Skeleton, Typography } from "@mui/material";
import graph from "../../images/avg_acc.png";
import { useEffect, useState } from "react";
import api from "../../utils/axiosInstance";
import dayjs from "dayjs";

interface TransactionData {
  id: string;
  createdAt: string;
}

const Avg_Daily_Txn = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [transactionList, setTransactionList] = useState<TransactionData[]>([]);
  const [average, setAverage] = useState<number | null>(null);

  const getTransactions = async () => {
    setLoading(true);
    try {
      const response = await api.get("/api/transaction/getAll");
      const data: TransactionData[] = response.data.transactions;

      if (data.length > 0) {
        setTransactionList(data);

        const sorted = [...data].sort((a, b) =>
          dayjs(a.createdAt).diff(dayjs(b.createdAt))
        );

        const firstDate = dayjs(sorted[0].createdAt).startOf("day");
        const lastDate = dayjs(sorted[sorted.length - 1].createdAt).startOf(
          "day"
        );

        const days = lastDate.diff(firstDate, "day") + 1; // inclusive
        const avg = data.length / days;
        setAverage(avg);
      } else {
        setAverage(0);
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTransactions();
  }, []);

  return (
    <div className="flex flex-col gap-[11px] bg-[#FFFFFF] py-[12px] px-[15px] rounded-[10px] w-[363px] ">
      <Typography
        color="#6C7A93"
        fontWeight={400}
        fontSize={14}
        sx={{ fontFamily: "Open Sans, sans-serif" }}
      >
        Avg. Daily Transactions
      </Typography>

      <div className="flex justify-between items-center">
        {loading ? (
          <Skeleton variant="text" width={80} height={40} />
        ) : (
          <Typography
            color="#101928"
            fontWeight={600}
            fontSize={32}
            sx={{ fontFamily: "Open Sans, sans-serif" }}
          >
            {average ? Math.round(average).toLocaleString() : 0}
          </Typography>
        )}
        <img src={graph} />
      </div>
    </div>
  );
};

export default Avg_Daily_Txn;
