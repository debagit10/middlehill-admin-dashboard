import { FormControl, Select, MenuItem, Typography } from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";
import { useState, useEffect } from "react";
import dayjs from "dayjs";

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

const Graph: React.FC<TranactionProps> = ({ transactions }) => {
  const [selectedMonth, setSelectedMonth] = useState(dayjs().month());
  const [chartData, setChartData] = useState<{ x: number; y: number }[]>([]);

  useEffect(() => {
    const filtered = transactions.filter((tx) => {
      const date = dayjs(tx.createdAt);
      return date.month() === selectedMonth;
    });

    const grouped: Record<number, number> = {};
    filtered.forEach((tx) => {
      const day = dayjs(tx.createdAt).date();
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

  const hasTransactions = chartData.some((d) => d.y > 0);

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

      {hasTransactions ? (
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
      ) : (
        <div className="flex justify-center py-[2rem]">
          <Typography
            color="#101928"
            fontWeight={600}
            fontSize={20}
            fontFamily="Open Sans, sans-serif"
          >
            No transactions for {months[selectedMonth].label}
          </Typography>
        </div>
      )}
    </div>
  );
};

export default Graph;
