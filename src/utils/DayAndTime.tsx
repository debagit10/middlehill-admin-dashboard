import React from "react";
import dayjs from "dayjs";

interface DayAndTimeProps {
  date: string;
}

const DayAndTime: React.FC<DayAndTimeProps> = ({ date }) => {
  const formatted = dayjs(date).format("MMM D, YYYY | hh:mma");
  return <>{formatted}</>;
};

export default DayAndTime;
