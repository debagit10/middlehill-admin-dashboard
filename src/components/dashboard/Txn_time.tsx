import { Box, CircularProgress, Typography } from "@mui/material";
import { LineChart } from "@mui/x-charts";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import api from "../../utils/axiosInstance";

const intervals = [
  { label: "3am", hour: 3 },
  { label: "6am", hour: 6 },
  { label: "9am", hour: 9 },
  { label: "12pm", hour: 12 },
  { label: "3pm", hour: 15 },
  { label: "6pm", hour: 18 },
  { label: "9pm", hour: 21 },
  { label: "12am", hour: 0 },
];

const Txn_time = () => {
  const [chartData, setChartData] = useState<{ x: string; y: number }[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const getTransactions = async () => {
    setLoading(true);
    try {
      const response = await api.get("/api/transaction/getAll");

      if (response.data.success) {
        setTransactions(response.data.transactions);
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

  useEffect(() => {
    if (transactions.length === 0) return;

    const transactionsByDay: Record<string, number[]> = {};

    transactions.forEach((tx) => {
      const dateStr = dayjs(tx.createdAt || tx.timestamp).format("YYYY-MM-DD");
      if (!transactionsByDay[dateStr]) transactionsByDay[dateStr] = [];
      transactionsByDay[dateStr].push(
        dayjs(tx.createdAt || tx.timestamp).hour()
      );
    });

    const numberOfDays = Object.keys(transactionsByDay).length;
    const intervalHours = intervals.map((i) => i.hour);
    intervalHours.push(24); // For wrap-around to midnight

    const intervalTransactionSums = intervals.map((interval, idx) => {
      let sum = 0;
      const startHour = intervalHours[idx];
      const endHour = intervalHours[idx + 1];

      for (const day in transactionsByDay) {
        const hours = transactionsByDay[day];
        const countInInterval = hours.filter(
          (h) => h >= startHour && h < endHour
        ).length;
        sum += countInInterval;
      }
      return sum;
    });

    const avgTransactions = intervalTransactionSums.map((sum) =>
      numberOfDays > 0 ? sum / numberOfDays : 0
    );

    const result = intervals.map((interval, idx) => ({
      x: interval.label,
      y: avgTransactions[idx],
    }));

    setChartData(result);
  }, [transactions]);

  const maxY = Math.max(...chartData.map((d) => d.y));
  const ticks = [];
  for (let i = 0; i <= Math.ceil(maxY) + 1; i++) {
    ticks.push(i);
  }

  return (
    <div className="border 1px border-[#E5E5E5] p-[16px] rounded-[12px]">
      <div color="#0A0A0A" className="flex items-center gap-[.5rem]">
        <Typography
          fontWeight={700}
          fontSize={14}
          sx={{ fontFamily: "Open Sans, sans-serif" }}
        >
          Avg. daily transactions per time interval
        </Typography>
      </div>

      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height={300}
        >
          <CircularProgress />
        </Box>
      ) : chartData.every((d) => d.y === 0) ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height={300}
        >
          <Typography>No data available </Typography>
        </Box>
      ) : (
        <LineChart
          dataset={chartData}
          xAxis={[
            {
              scaleType: "point",
              dataKey: "x",
            },
          ]}
          series={[{ dataKey: "y", showMark: false }]}
          yAxis={[
            {
              max: ticks[ticks.length - 1],
              dataKey: "y",
              valueFormatter: (val: any) => val.toFixed(1),
            },
          ]}
          height={340}
          width={363}
          grid={{ horizontal: true }}
        />
      )}
    </div>
  );
};

export default Txn_time;
