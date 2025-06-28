import { Skeleton, Typography } from "@mui/material";
import graph from "../../images/tot_bus.png";
import { useEffect, useMemo, useState } from "react";
import api from "../../utils/axiosInstance";
import dayjs from "dayjs";

interface BusinessData {
  id: string;
  createdAt: string;
}

const Total_Business = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [businessList, setBusinessList] = useState<BusinessData[]>([]);
  const [businessCount, setBusinessCount] = useState<number>(0);

  const getBusinesses = async () => {
    setLoading(true);
    try {
      const response = await api.get("/api/business/getList");

      if (response.data) {
        setBusinessCount(response.data.count);
        setBusinessList(response.data.businesses);
      }
    } catch (error: any) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBusinesses();
  }, []);

  const currentMonth = dayjs().format("YYYY-MM");
  const previousMonth = dayjs().subtract(1, "month").format("YYYY-MM");

  const monthlyStats = useMemo(() => {
    const stats: Record<string, number> = {};

    businessList.forEach((business) => {
      const month = dayjs(business.createdAt).format("YYYY-MM");
      stats[month] = (stats[month] || 0) + 1;
    });

    return stats;
  }, [businessList]);

  const currentCount = monthlyStats[currentMonth] || 0;
  const previousCount = monthlyStats[previousMonth] || 0;

  const growth =
    previousCount === 0
      ? currentCount > 0
        ? 100
        : 0
      : ((currentCount - previousCount) / previousCount) * 100;

  const growthRounded = growth.toFixed(1);
  const difference = currentCount - previousCount;

  const growthValue = parseFloat(growthRounded);
  const isGrowthPositive = growthValue >= 0;

  return (
    <div className="flex flex-col gap-[11px] bg-[#FFFFFF] py-[12px] px-[15px] rounded-[10px] w-[363px]">
      <Typography
        color="#6C7A93"
        fontWeight={400}
        fontSize={14}
        sx={{ fontFamily: "Open Sans, sans-serif" }}
      >
        Total Businesses
      </Typography>

      <div className="flex justify-between items-center">
        {loading ? (
          <>
            <Skeleton variant="text" width={80} height={40} />
            <Skeleton variant="rectangular" width={60} height={40} />
          </>
        ) : (
          <>
            <Typography
              color="#101928"
              fontWeight={600}
              fontSize={32}
              sx={{ fontFamily: "Open Sans, sans-serif" }}
            >
              {businessCount}
            </Typography>
            <img src={graph} />
          </>
        )}
      </div>

      <div className="pb-1 flex items-center gap-[7px]">
        {loading ? (
          <>
            <Skeleton variant="rounded" width={60} height={24} />
            <Skeleton variant="text" width={160} height={20} />
          </>
        ) : (
          <>
            <Typography
              fontSize={12}
              fontWeight={600}
              sx={{
                fontFamily: "Open Sans, sans-serif",
                backgroundColor: isGrowthPositive ? "#40C4AA33" : "#FFCDD233",
                color: isGrowthPositive ? "#287F6E" : "#D32F2F",
                paddingX: "4px",
                paddingY: "8px",
                borderRadius: "6px",
                border:
                  parseFloat(growthRounded) >= 0
                    ? "1px solid #40C4AA33"
                    : "1px solid #FFCDD233",
              }}
            >
              {isGrowthPositive ? `+${growthRounded}%` : `${growthRounded}%`}
            </Typography>

            <Typography
              color="#6C7A93"
              fontSize={12}
              fontWeight={600}
              sx={{ fontFamily: "Open Sans, sans-serif" }}
            >
              {difference >= 0 ? `+${difference}` : difference}{" "}
              <span className="text-[#737373] text-[12px] font-extrabold">
                compared to last month
              </span>
            </Typography>
          </>
        )}
      </div>
    </div>
  );
};

export default Total_Business;
