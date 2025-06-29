import {
  FormControl,
  Select,
  MenuItem,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";
import { LineChart } from "@mui/x-charts";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import api from "../../utils/axiosInstance";

const Monthly_sales = () => {
  const [selectedYear, setSelectedYear] = useState(dayjs().year());
  const [chartData, setChartData] = useState<{ x: string; y: number }[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [years, setYears] = useState<number[]>([]);
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
    const monthlyTotals = Array(12).fill(0);

    transactions.forEach((tx) => {
      const date = dayjs(tx.createdAt);
      const year = date.year();
      const month = date.month();

      if (year === selectedYear && !tx.deleted) {
        monthlyTotals[month] += tx.amount;
      }
    });

    const dataForChart = monthlyTotals.map((total, index) => ({
      x: dayjs().month(index).format("MMM"),
      y: total,
    }));

    setChartData(dataForChart);
    setTotalAmount(monthlyTotals.reduce((sum, val) => sum + val, 0));

    const transactionYears = Array.from(
      new Set(transactions.map((tx) => dayjs(tx.createdAt).year()))
    ).sort((a, b) => a - b);

    setYears(transactionYears);
    if (transactionYears.length > 0) {
      setSelectedYear(transactionYears[0]);
    }
  }, [transactions, selectedYear]);

  const maxY = Math.max(...chartData.map((d) => d.y));
  const ticks = [];
  for (let i = 0; i <= Math.ceil(maxY) + 10; i += 10) {
    ticks.push(i);
  }

  const formatNumber = (num: number) => {
    if (num >= 1_000_000) {
      return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
    } else if (num >= 1_000) {
      return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "k";
    }
    return num.toString();
  };

  const formattedTotal = totalAmount.toLocaleString();

  return (
    <div className="border 1px border-[#E5E5E5] p-[16px] rounded-[12px] w-[600px]">
      <div className="flex justify-between items-center mb-4">
        <Typography
          fontWeight={700}
          fontSize={14}
          sx={{ fontFamily: "Open Sans, sans-serif" }}
        >
          Monthly Sales - {selectedYear} (₦{formattedTotal})
        </Typography>
        <FormControl size="small">
          <Select
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
          >
            {years.map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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
          <Typography>No sales data available for {selectedYear}</Typography>
        </Box>
      ) : (
        <LineChart
          xAxis={[
            {
              scaleType: "band",
              data: chartData.map((d) => d.x),
            },
          ]}
          yAxis={[
            {
              max: ticks[ticks.length - 1],
              valueFormatter: formatNumber,
            },
          ]}
          series={[
            {
              data: chartData.map((d) => d.y),
              showMark: false,
            },
          ]}
          width={600}
          height={300}
          grid={{ horizontal: true }}
        />
      )}
    </div>
  );
};

export default Monthly_sales;
