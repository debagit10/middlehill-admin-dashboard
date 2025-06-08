import { Box, Tabs, Tab } from "@mui/material";
import { useState } from "react";
import Overview from "../components/business-tabs/Overview";
import Transaction from "../components/business-tabs/Transaction";
import Statement from "../components/business-tabs/Statement";

interface Transaction {
  id: string;
  item_name: string;
  quantity: string;
  amount: number;
  deleted: boolean;
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

interface BusinessDetails {
  details: UserDetails;
}

const Business_tabs: React.FC<BusinessDetails> = ({ details }) => {
  interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }

  function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
  }

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            sx={{
              "& .MuiTabs-indicator": {
                backgroundColor: "#1358A3",
                height: 2,
              },
            }}
          >
            {["Overview", "Transactions", "Statements"].map((label, index) => (
              <Tab
                key={label}
                label={label}
                {...a11yProps(index)}
                sx={{
                  textTransform: "capitalize",
                  fontSize: "14px",
                  fontWeight: 400,
                  fontFamily: "Open Sans, sans-serif",
                  color: "#344054",
                  "&.Mui-selected": {
                    color: "#1358A3",
                  },
                }}
              />
            ))}
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <Overview overview={details} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <Transaction />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <Statement />
        </CustomTabPanel>
      </Box>
    </div>
  );
};

export default Business_tabs;
