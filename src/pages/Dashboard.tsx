import { Divider, Typography } from "@mui/material";
import Pages from "../container/Pages";
import Total_Business from "../components/metrics/Total_Business";
import Avg_Accuracy from "../components/metrics/Avg_Accuracy";
import Total_Transactions from "../components/metrics/Total_Transactions";
import Add_admin from "../components/quick_action/Add_admin";

const Dashboard = () => {
  return (
    <Pages page="Dashboard">
      <div className="flex gap-[25px]">
        <div className="pt-[20px]">
          <div className="flex flex-col gap-[8px]">
            <Typography color="#101928" fontWeight={600} fontSize={28}>
              Hello, Admin
            </Typography>

            <Typography>
              Track key metrics, performance, and team activities in one place.
            </Typography>
          </div>

          <div className="flex gap-[8px] mt-[1rem]">
            <Total_Business />
            <Avg_Accuracy />
            <Total_Transactions />
          </div>
        </div>

        <Divider orientation="vertical" flexItem />

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
