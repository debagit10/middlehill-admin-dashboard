import { Typography } from "@mui/material";
import graph from "../../images/avg_acc.png";

const Avg_Daily_Txn = () => {
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
        <Typography
          color="#101928"
          fontWeight={600}
          fontSize={32}
          sx={{ fontFamily: "Open Sans, sans-serif" }}
        >
          4,008
        </Typography>

        <img src={graph} />
      </div>

      <div className="pb-1 flex items-center  gap-[7px]">
        <Typography
          color="#036B26"
          fontSize={12}
          fontWeight={600}
          sx={{
            fontFamily: "Open Sans, sans-serif",

            backgroundColor: "#40C4AA33",
            paddingX: "4px",
            paddingY: "8px",
            borderRadius: "6px",
            border: "1px solid #40C4AA33",
            color: "#287F6E",
          }}
        >
          + 2.5%
        </Typography>

        <Typography
          color="#6C7A93"
          fontSize={12}
          fontWeight={600}
          sx={{ fontFamily: "Open Sans, sans-serif" }}
        >
          +2812{" "}
          <span className="text-[#737373] text-[12px] font-extrabold">
            compared to last month
          </span>
        </Typography>
      </div>
    </div>
  );
};

export default Avg_Daily_Txn;
