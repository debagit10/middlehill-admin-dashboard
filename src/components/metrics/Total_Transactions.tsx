import { Skeleton, Typography } from "@mui/material";
import graph from "../../images/tot_txn.png";
import { useEffect, useMemo, useState } from "react";
import api from "../../utils/axiosInstance";
import dayjs from "dayjs";

interface TransactionData {
  id: string;
  createdAt: string;
}

const Total_Transactions = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [transactionList, setTransactionList] = useState<TransactionData[]>([]);
  const [transactionCount, setTransactionCount] = useState<number>(0);

  const getTransactions = async () => {
    setLoading(true);
    try {
      const response = await api.get("/api/transaction/getAll");

      if (response.data) {
        setTransactionCount(response.data.count);
        setTransactionList(response.data.transactions);
      }
    } catch (error: any) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTransactions();
  }, []);

  const currentMonth = dayjs().format("YYYY-MM");
  const previousMonth = dayjs().subtract(1, "month").format("YYYY-MM");

  const monthlyStats = useMemo(() => {
    const stats: Record<string, number> = {};
    transactionList.forEach((transaction) => {
      const month = dayjs(transaction.createdAt).format("YYYY-MM");
      stats[month] = (stats[month] || 0) + 1;
    });
    return stats;
  }, [transactionList]);

  const currentCount = monthlyStats[currentMonth] || 0;
  const previousCount = monthlyStats[previousMonth] || 0;

  const growth =
    previousCount === 0
      ? currentCount > 0
        ? 100
        : 0
      : ((previousCount - currentCount) / previousCount) * 100;

  const growthRounded = growth.toFixed(1);
  const difference = previousCount - currentCount;

  return (
    <div className="flex flex-col gap-[11px] bg-[#FFFFFF] py-[12px] px-[15px] rounded-[10px] w-[363px]">
      <Typography
        color="#6C7A93"
        fontWeight={400}
        fontSize={14}
        sx={{ fontFamily: "Open Sans, sans-serif" }}
      >
        Total Transactions
      </Typography>

      <div className="flex justify-between items-center">
        {loading ? (
          <>
            <Skeleton variant="text" width={80} height={40} />
            <Skeleton variant="rectangular" width={50} height={30} />
          </>
        ) : (
          <>
            <Typography
              color="#101928"
              fontWeight={600}
              fontSize={32}
              sx={{ fontFamily: "Open Sans, sans-serif" }}
            >
              {transactionCount}
            </Typography>
            <img src={graph} />
          </>
        )}
      </div>

      <div className="pb-1 flex items-center gap-[7px]">
        {loading ? (
          <>
            <Skeleton variant="rectangular" width={60} height={25} />
            <Skeleton variant="text" width={160} height={20} />
          </>
        ) : (
          <>
            <Typography
              fontSize={12}
              fontWeight={600}
              sx={{
                fontFamily: "Open Sans, sans-serif",
                backgroundColor:
                  parseFloat(growthRounded) >= 0 ? "#40C4AA33" : "#FFCDD233", // light green or light red
                paddingX: "4px",
                paddingY: "8px",
                borderRadius: "6px",
                border:
                  parseFloat(growthRounded) >= 0
                    ? "1px solid #40C4AA33"
                    : "1px solid #FFCDD233",
                color: parseFloat(growthRounded) >= 0 ? "#287F6E" : "#D32F2F", // green or red
              }}
            >
              {parseFloat(growthRounded) >= 0
                ? `+${growthRounded}%`
                : `${growthRounded}%`}
            </Typography>

            <Typography
              color="#6C7A93"
              fontSize={12}
              fontWeight={600}
              sx={{ fontFamily: "Open Sans, sans-serif" }}
            >
              {difference >= 0 ? `+${difference}` : difference}
              <span className="text-[#737373] text-[12px] font-extrabold">
                {" "}
                compared to last month
              </span>
            </Typography>
          </>
        )}
      </div>
    </div>
  );
};

export default Total_Transactions;
