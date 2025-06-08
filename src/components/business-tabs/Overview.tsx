import { Chip, TextField, Typography } from "@mui/material";
import Total_transactions from "../business_mgt/Total_transactions";
import Avg_txn from "../business_mgt/Avg_txn";
import Graph from "../business_mgt/Graph";
import type React from "react";

interface LabeledInputProps {
  label: string;
  fullWidth?: boolean;
  type?: string;
  value: string;
}

interface Transaction {
  id: string;
  item_name: string;
  quantity: string;
  amount: number;
  deleted: boolean;
  createdAt: string;
}

interface UserDetails {
  id: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  suspended: boolean;
  user_profile: UserProfile | null;
  transactions: Transaction[];
}

interface UserProfile {
  email: string;
  bank_acc_no: string;
  bank_name: string;
  business_name: string;
  pic: string;
  address: string;
}

interface OverviewProps {
  overview: UserDetails;
}

const Overview: React.FC<OverviewProps> = ({ overview }) => {
  const LabeledInput = ({ label, value, type = "text" }: LabeledInputProps) => (
    <div className="flex flex-col gap-1 w-full">
      <Typography
        fontWeight={600}
        sx={{ color: "#525252", fontFamily: "Open Sans, sans-serif" }}
        fontSize={14}
      >
        {label}
      </Typography>
      <TextField
        disabled={true}
        value={value}
        type={type}
        size="small"
        sx={{
          color: "#101928",
          fontFamily: "Open Sans, sans-serif",
          fontSize: "16px",
          fontWeight: 600,
          "& .MuiOutlinedInput-root": {
            borderRadius: "8px",
          },
        }}
      />
    </div>
  );

  const inputGroups = [
    [
      {
        label: "Email Address",
        value: overview.user_profile?.email
          ? `${overview.user_profile?.email}`
          : "null",
      },
      { label: "Phone Number", value: `${overview.phone_number}` },
    ],
    [
      {
        label: "Username",
        value: `${overview.first_name} ${overview.last_name}`,
      },
      { label: "Country", value: "Nigeria" },
    ],
  ];

  const singleInput = {
    label: "Bank Info",
    value:
      overview.user_profile?.bank_name && overview.user_profile?.bank_acc_no
        ? `${overview.user_profile.bank_name} ${overview.user_profile.bank_acc_no}`
        : "null",
  };

  return (
    <div className="flex gap-[2rem] ">
      <div className="border 1px border-[#E5E5E5] w-[513px] rounded-[12px] p-[24px] ">
        <Typography
          color="#101928"
          fontWeight={600}
          fontSize={20}
          fontFamily="Open Sans, sans-serif"
        >
          Profile Details
        </Typography>

        <div className="flex flex-col mt-[1rem]">
          <div className="flex flex-col gap-[8px] max-w-2xl">
            {inputGroups.map((group, i) => (
              <div key={i} className="flex gap-[8px] mb-2">
                {group.map(({ label, value }, idx) => (
                  <LabeledInput key={idx} label={label} value={value} />
                ))}
              </div>
            ))}

            <div className="w-full">
              <LabeledInput
                label={singleInput.label}
                value={singleInput.value}
              />
            </div>
          </div>
        </div>

        <div className="my-3">
          <Typography
            color="#475367"
            fontWeight={600}
            fontSize={14}
            fontFamily="Open Sans, sans-serif"
          >
            Status
          </Typography>
          <Chip
            label={overview.suspended ? "Suspended" : "Active"}
            sx={{
              backgroundColor: overview.suspended ? "#FEEDE6" : "#E6F4EA",
              color: overview.suspended ? "#D33E08" : "#27AE60",
              fontWeight: 600,
              fontSize: "14px",
              fontFamily: "Open Sans, sans-serif",
            }}
          />
        </div>
      </div>

      <div className="flex flex-col gap-[1rem] ">
        <div className="flex gap-[1rem]">
          <Total_transactions transactions={overview.transactions} />
          <Avg_txn transactions={overview.transactions} />
        </div>

        <div>
          <Graph transactions={overview.transactions} />
        </div>
      </div>
    </div>
  );
};

export default Overview;
