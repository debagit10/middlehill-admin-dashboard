import { Typography } from "@mui/material";
import { LineChart } from "@mui/x-charts";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

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

const Txn_time = () => {
  const [chartData, setChartData] = useState<{ x: string; y: number }[]>([]);

  useEffect(() => {
    // Group transactions by day to calculate averages later
    const transactionsByDay: Record<string, number[]> = {};

    transactions.forEach((tx) => {
      const dateStr = dayjs(tx.timestamp).format("YYYY-MM-DD");
      if (!transactionsByDay[dateStr]) transactionsByDay[dateStr] = [];
      transactionsByDay[dateStr].push(dayjs(tx.timestamp).hour());
    });

    // For each interval, count how many transactions happened in that interval for each day
    // Then average across days

    // Number of days in data
    const numberOfDays = Object.keys(transactionsByDay).length;

    // Helper to check if hour belongs to the interval range
    // We'll treat intervals as [prevIntervalHour, currentIntervalHour)
    // For example, for 3am interval: from 0 (prev) to 3
    // For 6am interval: from 3 to 6, etc.
    const intervalHours = intervals.map((i) => i.hour);
    // Add 24 to handle 12am next day wrap
    intervalHours.push(24);

    // Sum counts per interval over all days
    const intervalTransactionSums = intervals.map((interval, idx) => {
      let sum = 0;
      const startHour = intervalHours[idx];
      const endHour = intervalHours[idx + 1];

      for (const day in transactionsByDay) {
        const hours = transactionsByDay[day];
        // Count how many transactions happened in this interval in this day
        const countInInterval = hours.filter((h) => {
          if (startHour < endHour) {
            return h >= startHour && h < endHour;
          } else {
            // For 12am interval, wraps from 18 to 24, but 24 treated as next day
            // Here, this case should not happen with given intervals
            return false;
          }
        }).length;
        sum += countInInterval;
      }
      return sum;
    });

    // Calculate average per interval
    const avgTransactions = intervalTransactionSums.map((sum) =>
      numberOfDays > 0 ? sum / numberOfDays : 0
    );

    // Format chart data
    const result = intervals.map((interval, idx) => ({
      x: interval.label,
      y: avgTransactions[idx],
    }));

    setChartData(result);
  }, []);

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
            valueFormatter: (val: any) => val.toFixed(1),
          },
        ]}
        height={340}
        width={363}
        grid={{ horizontal: true }}
      />
    </div>
  );
};

export default Txn_time;
