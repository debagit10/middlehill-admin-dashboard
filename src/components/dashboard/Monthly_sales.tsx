import { FormControl, Select, MenuItem, Typography } from "@mui/material";
import { LineChart } from "@mui/x-charts";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

const years = [
  { label: "2025", value: 2025 },
  { label: "2026", value: 2026 },
  { label: "2027", value: 2027 },
];

const transactions = [
  // January
  { id: 1, amount: 4000, timestamp: "2025-01-01T10:15:00Z" },
  { id: 2, amount: 7000, timestamp: "2025-01-01T12:42:00Z" },
  { id: 3, amount: 1500, timestamp: "2025-01-02T09:30:00Z" },
  { id: 4, amount: 1000, timestamp: "2025-01-03T18:12:00Z" },
  { id: 5, amount: 2200, timestamp: "2025-01-04T11:50:00Z" },
  { id: 6, amount: 800, timestamp: "2025-01-05T16:03:00Z" },
  { id: 7, amount: 2400, timestamp: "2025-01-07T08:00:00Z" },
  { id: 8, amount: 3200, timestamp: "2025-01-07T10:00:00Z" },
  { id: 9, amount: 1200, timestamp: "2025-01-10T15:44:00Z" },
  { id: 10, amount: 9000, timestamp: "2025-01-12T09:15:00Z" },
  { id: 11, amount: 7500, timestamp: "2025-01-12T17:45:00Z" },
  { id: 12, amount: 5400, timestamp: "2025-01-15T11:30:00Z" },
  { id: 13, amount: 3300, timestamp: "2025-01-17T22:11:00Z" },
  { id: 14, amount: 2100, timestamp: "2025-01-20T13:25:00Z" },
  { id: 15, amount: 1900, timestamp: "2025-01-22T20:45:00Z" },
  { id: 16, amount: 3000, timestamp: "2025-01-25T07:00:00Z" },
  { id: 17, amount: 1800, timestamp: "2025-01-27T10:20:00Z" },
  { id: 18, amount: 2600, timestamp: "2025-01-30T12:55:00Z" },
  { id: 19, amount: 2600, timestamp: "2025-01-31T12:55:00Z" },

  // February
  { id: 20, amount: 2500, timestamp: "2025-02-01T09:12:00Z" },
  { id: 21, amount: 3000, timestamp: "2025-02-01T11:00:00Z" },
  { id: 22, amount: 1200, timestamp: "2025-02-02T14:05:00Z" },
  { id: 23, amount: 500, timestamp: "2025-02-03T08:20:00Z" },
  { id: 24, amount: 1100, timestamp: "2025-02-05T17:30:00Z" },
  { id: 25, amount: 4300, timestamp: "2025-02-07T10:40:00Z" },
  { id: 26, amount: 2900, timestamp: "2025-02-08T22:50:00Z" },
  { id: 27, amount: 3500, timestamp: "2025-02-09T13:00:00Z" },
  { id: 28, amount: 2500, timestamp: "2025-02-11T07:42:00Z" },
  { id: 29, amount: 1700, timestamp: "2025-02-12T18:00:00Z" },
  { id: 30, amount: 4000, timestamp: "2025-02-15T09:15:00Z" },
  { id: 31, amount: 2700, timestamp: "2025-02-18T15:33:00Z" },
  { id: 32, amount: 2200, timestamp: "2025-02-21T16:45:00Z" },
  { id: 33, amount: 1800, timestamp: "2025-02-23T19:20:00Z" },
  { id: 34, amount: 3900, timestamp: "2025-02-25T10:50:00Z" },
  { id: 35, amount: 4200, timestamp: "2025-02-27T20:30:00Z" },
  { id: 36, amount: 5000, timestamp: "2025-02-28T23:55:00Z" },

  // March
  { id: 37, amount: 2000, timestamp: "2025-03-01T12:00:00Z" },
  { id: 38, amount: 3200, timestamp: "2025-03-02T09:45:00Z" },
  { id: 39, amount: 1500, timestamp: "2025-03-03T11:00:00Z" },
  { id: 40, amount: 1800, timestamp: "2025-03-05T13:00:00Z" },
  { id: 41, amount: 2500, timestamp: "2025-03-10T08:00:00Z" },
  { id: 42, amount: 4000, timestamp: "2025-03-15T10:30:00Z" },
  { id: 43, amount: 3500, timestamp: "2025-03-20T14:45:00Z" },
  { id: 44, amount: 2700, timestamp: "2025-03-25T16:10:00Z" },
  { id: 45, amount: 500, timestamp: "2025-03-31T23:59:00Z" },

  // April
  { id: 46, amount: 3000, timestamp: "2025-04-01T09:00:00Z" },
  { id: 47, amount: 3200, timestamp: "2025-04-02T10:00:00Z" },
  { id: 48, amount: 1500, timestamp: "2025-04-03T14:30:00Z" },
  { id: 49, amount: 1100, timestamp: "2025-04-05T17:00:00Z" },
  { id: 50, amount: 1800, timestamp: "2025-04-10T19:45:00Z" },
  { id: 51, amount: 4200, timestamp: "2025-04-15T08:25:00Z" },
  { id: 52, amount: 3900, timestamp: "2025-04-20T10:10:00Z" },
  { id: 53, amount: 5000, timestamp: "2025-04-25T21:00:00Z" },
  { id: 54, amount: 600, timestamp: "2025-04-30T06:00:00Z" },
];

const Monthly_sales = () => {
  const [selectedYear, setSelectedYear] = useState(dayjs().year());
  const [chartData, setChartData] = useState<{ x: string; y: number }[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    // Filter transactions for the selected year
    const filtered = transactions.filter((tx) => {
      const date = dayjs(tx.timestamp);
      return date.year() === selectedYear;
    });

    // Initialize months map with zero values
    const grouped: Record<number, number> = {};
    for (let i = 0; i < 12; i++) {
      grouped[i] = 0;
    }

    // Sum amounts per month
    filtered.forEach((tx) => {
      if (!tx || typeof tx.amount !== "number" || !tx.timestamp) return;

      const month = dayjs(tx.timestamp).month(); // 0–11
      grouped[month] += tx.amount;
    });

    const total = filtered.reduce((acc, tx) => acc + tx.amount, 0);
    setTotalAmount(total);

    // Format chart data
    const result = Array.from({ length: 12 }, (_, month) => ({
      x: dayjs().month(month).format("MMM"), // 'Jan', 'Feb', etc.
      y: grouped[month] || 0,
    }));

    setChartData(result);
  }, [selectedYear, transactions]);

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
    <div className="border 1px border-[#E5E5E5] p-[16px] rounded-[12px]">
      <div className="flex justify-between">
        <div color="#0A0A0A" className="flex items-center gap-[.5rem]">
          <Typography
            fontWeight={700}
            fontSize={14}
            sx={{ fontFamily: "Open Sans, sans-serif" }}
          >
            Monthly Sales
          </Typography>

          <Typography
            fontWeight={700}
            fontSize={14}
            sx={{ fontFamily: "Open Sans, sans-serif" }}
          >
            -
          </Typography>

          <Typography
            fontWeight={700}
            fontSize={24}
            sx={{ fontFamily: "Open Sans, sans-serif" }}
          >
            {formattedTotal}
          </Typography>
        </div>

        <FormControl className="mb-6">
          <Select
            size="small"
            labelId="year-select-label"
            id="year-select"
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
          >
            {years.map((year) => (
              <MenuItem key={year.value} value={year.value}>
                {year.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

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
            ticks,
            valueFormatter: formatNumber,
          },
        ]}
        height={340}
        width={742}
        grid={{ horizontal: true }}
      />
    </div>
  );
};

export default Monthly_sales;
