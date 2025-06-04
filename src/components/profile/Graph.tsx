import { FormControl, Select, MenuItem } from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";
import { useState, useEffect } from "react";
import dayjs from "dayjs";

const months = [
  { label: "January", value: 0 },
  { label: "February", value: 1 },
  { label: "March", value: 2 },
  { label: "April", value: 3 },
  { label: "May", value: 4 },
  { label: "June", value: 5 },
  { label: "July", value: 6 },
  { label: "August", value: 7 },
  { label: "September", value: 8 },
  { label: "October", value: 9 },
  { label: "November", value: 10 },
  { label: "December", value: 11 },
];

const transactions = [
  // January
  { id: 1, amount: 4000, timestamp: "2025-01-01T10:15:00Z" },
  { id: 2, amount: 7000, timestamp: "2025-01-01T12:42:00Z" },
  { id: 2, amount: 7000, timestamp: "2025-01-01T12:42:00Z" },
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
  { id: 18, amount: 2600, timestamp: "2025-01-31T12:55:00Z" },

  // February
  { id: 20, amount: 2500, timestamp: "2025-02-01T09:12:00Z" },
  { id: 21, amount: 3000, timestamp: "2025-02-01T11:00:00Z" },
  { id: 21, amount: 3000, timestamp: "2025-02-01T11:00:00Z" },
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

  { id: 1, timestamp: "2025-03-01T12:00:00Z" },
  { id: 2, timestamp: "2025-03-01T15:30:00Z" },
  { id: 3, timestamp: "2025-03-02T09:45:00Z" },
  { id: 4, timestamp: "2025-03-02T17:20:00Z" },
  { id: 5, timestamp: "2025-03-03T11:00:00Z" },
  { id: 6, timestamp: "2025-03-05T13:00:00Z" },
  { id: 7, timestamp: "2025-03-05T18:00:00Z" },
  { id: 8, timestamp: "2025-03-10T08:00:00Z" },
  { id: 9, timestamp: "2025-03-15T10:30:00Z" },
  { id: 10, timestamp: "2025-03-20T14:45:00Z" },
  { id: 11, timestamp: "2025-03-25T16:10:00Z" },
  { id: 12, timestamp: "2025-03-31T23:59:00Z" },

  { id: 13, timestamp: "2025-04-01T09:00:00Z" },
  { id: 14, timestamp: "2025-04-01T11:00:00Z" },
  { id: 15, timestamp: "2025-04-02T10:00:00Z" },
  { id: 16, timestamp: "2025-04-03T14:30:00Z" },
  { id: 17, timestamp: "2025-04-04T13:15:00Z" },
  { id: 18, timestamp: "2025-04-05T17:00:00Z" },
  { id: 19, timestamp: "2025-04-10T19:45:00Z" },
  { id: 20, timestamp: "2025-04-15T08:25:00Z" },
  { id: 21, timestamp: "2025-04-20T10:10:00Z" },
  { id: 22, timestamp: "2025-04-25T21:00:00Z" },
  { id: 23, timestamp: "2025-04-30T06:00:00Z" },
  { id: 23, timestamp: "2025-04-31T06:00:00Z" },
  { id: 23, timestamp: "2025-04-31T06:00:00Z" },
];

const Graph = () => {
  const [selectedMonth, setSelectedMonth] = useState(dayjs().month());
  const [chartData, setChartData] = useState<{ x: number; y: number }[]>([]);

  useEffect(() => {
    const filtered = transactions.filter((tx) => {
      const date = dayjs(tx.timestamp);
      return date.month() === selectedMonth;
    });

    const grouped: Record<number, number> = {};
    filtered.forEach((tx) => {
      const day = dayjs(tx.timestamp).date();
      grouped[day] = (grouped[day] || 0) + 1;
    });

    const maxDayFromData = dayjs().month(selectedMonth).daysInMonth();

    const result = [];
    for (let day = 1; day <= maxDayFromData; day++) {
      result.push({
        x: day,
        y: grouped[day] || 0,
      });
    }

    setChartData(result);
  }, [selectedMonth, transactions]);

  const formatDayWithSuffix = (day: number): string => {
    if (day > 3 && day < 21) return `${day}th`;
    switch (day % 10) {
      case 1:
        return `${day}st`;
      case 2:
        return `${day}nd`;
      case 3:
        return `${day}rd`;
      default:
        return `${day}th`;
    }
  };

  const maxY = Math.max(...chartData.map((d) => d.y));
  const ticks = [];
  for (let i = 0; i <= Math.ceil(maxY) + 2; i += 2) {
    ticks.push(i);
  }

  const daysInMonth = dayjs().month(selectedMonth).daysInMonth();
  const xTicks = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <div className="border 1px border-[#E5E5E5] pt-[.3rem] px-[15px] rounded-[10px]">
      <FormControl className="mb-6">
        <Select
          size="small"
          labelId="month-select-label"
          id="month-select"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(Number(e.target.value))}
        >
          {months.map((month) => (
            <MenuItem key={month.value} value={month.value}>
              {month.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <LineChart
        dataset={chartData}
        xAxis={[
          {
            scaleType: "point",
            label: "Days",
            dataKey: "x",
            ticks: xTicks,
            valueFormatter: (value: string) =>
              formatDayWithSuffix(Number(value)),
          },
        ]}
        series={[{ dataKey: "y", showMark: false }]}
        yAxis={[
          {
            max: ticks[ticks.length - 1],
            ticks,
            valueFormatter: (value: string) => value.toString(),
            label: "Transactions",
          },
        ]}
        height={350}
        width={600}
        grid={{ horizontal: true }}
      />
    </div>
  );
};

export default Graph;
