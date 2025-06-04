import { Button, Divider, Typography } from "@mui/material";
import Pages from "../container/Pages";
import Total_Business from "../components/metrics/Total_Business";
import Total_Transactions from "../components/metrics/Total_Transactions";
import Add_admin from "../modals/admin/Add_admin";
import { TbReport } from "react-icons/tb";
import Avg_Daily_Txn from "../components/metrics/Avg_Daily_Txn";

const Dashboard = () => {
  return (
    <Pages page="Dashboard">
      <div className="flex justify-between py-[1rem] items-center">
        <div className="flex flex-col gap-[8px]">
          <Typography color="#101928" fontWeight={600} fontSize={28}>
            Hello, Admin
          </Typography>

          <Typography>
            Track key metrics, performance, and team activities in one place.
          </Typography>
        </div>

        <div className="flex gap-[12px]">
          <Button
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
            <Typography fontSize={16} fontWeight={600}>
              Generate Report
            </Typography>
          </Button>

          <Add_admin />
        </div>
      </div>

      <div className="flex justify-around gap-[16px] mt-[1rem]">
        <Total_Business />
        <Avg_Daily_Txn />
        <Total_Transactions />
      </div>

      <div className="flex gap-[25px]">
        <div className="pt-[25px] flex flex-col gap-[24px]">
          <Typography color="#101928" fontWeight={600} fontSize={18}>
            Quick Actions
          </Typography>

          <div className="flex gap-[6px]">
            <Add_admin />
            <Add_admin />
            <Add_admin />
          </div>
        </div>
      </div>
    </Pages>
  );
};

export default Dashboard;
