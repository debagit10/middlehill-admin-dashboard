import { Button, Typography } from "@mui/material";
import Pages from "../container/Pages";
import Total_Business from "../components/metrics/Total_Business";
import Total_Transactions from "../components/metrics/Total_Transactions";
import Add_admin from "../modals/admin/Add_admin";
import { TbReport } from "react-icons/tb";
import Avg_Daily_Txn from "../components/metrics/Avg_Daily_Txn";
import Monthly_sales from "../components/dashboard/Monthly_sales";
import Txn_time from "../components/dashboard/Txn_time";

const Dashboard = () => {
  return (
    <Pages page="Dashboard">
      <div className="flex justify-between py-[1rem] items-center">
        <div className="flex flex-col gap-[8px]">
          <Typography
            sx={{ fontFamily: "Open Sans, sans-serif" }}
            color="#101928"
            fontWeight={600}
            fontSize={28}
          >
            Hello, Admin
          </Typography>

          <Typography sx={{ fontFamily: "Open Sans, sans-serif" }}>
            Track key metrics, performance, and team activities in one place.
          </Typography>
        </div>

        <div className="flex gap-[12px]">
          {/* <Button
            variant="outlined"
            sx={{
              border: "1px solid #E5E5E5",
              borderRadius: "12px",
              backgroundColor: "#FFFFFF",
              width: "197px",
              height: "48px",
              textTransform: "capitalize",
              fontFamily: "Open Sans, sans-serif",
              color: "#0A0A0A",
            }}
            startIcon={<TbReport />}
          >
            <Typography
              fontSize={16}
              fontWeight={600}
              sx={{ fontFamily: "Open Sans, sans-serif" }}
            >
              Generate Report
            </Typography>
          </Button> */}

          <Add_admin />
        </div>
      </div>

      <div className="flex justify-around  mt-[1rem]">
        <Total_Business />
        <Total_Transactions />
        <Avg_Daily_Txn />
      </div>

      <div className="flex justify-around mt-[1rem]">
        <div>
          <Monthly_sales />
        </div>

        <div>
          <Txn_time />
        </div>
      </div>
    </Pages>
  );
};

export default Dashboard;
