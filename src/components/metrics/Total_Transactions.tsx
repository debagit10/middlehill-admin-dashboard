import { Typography } from "@mui/material";
import graph from "../../images/tot_txn.png";

const Total_Transactions = () => {
  return (
    <div className="flex flex-col gap-[11px] bg-[#FDEEED] py-[12px] px-[15px] rounded-[10px] w-[237px] h-[137px]">
      <Typography
        color="#6C7A93"
        fontWeight={400}
        fontSize={14}
        sx={{ fontFamily: "Open Sans, sans-serif" }}
      >
        Total Transactions
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

      <div className="flex  gap-[7px]">
        <Typography
          color="#6C7A93"
          fontSize={14}
          fontWeight={400}
          sx={{ fontFamily: "Open Sans, sans-serif" }}
        >
          Last 30 days
        </Typography>

        <Typography
          color="#036B26"
          fontSize={12}
          fontWeight={500}
          sx={{
            fontFamily: "Open Sans, sans-serif",
            marginTop: "2px",
            backgroundColor: "#FFFFFF",
            paddingX: "4px",
            borderRadius: "10px",
          }}
        >
          + 2.5%
        </Typography>
      </div>
    </div>
  );
};

export default Total_Transactions;
