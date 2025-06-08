import Pages from "../../container/Pages";
import { Button, Typography } from "@mui/material";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import Business_tabs from "../../tabs/Business_tabs";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../utils/axiosInstance";

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

const Business = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [details, setDetails] = useState<BusinessDetails>();

  const getDetails = async () => {
    try {
      const response = await api.get(`/api/business/details/${id}`);

      setDetails(response.data);
    } catch (error: any) {
      if (error.response.data.error) {
        return;
      }
    }
  };

  useEffect(() => {
    getDetails();
  }, []);

  console.log(details);

  return (
    <Pages page="Business Management">
      <div className="flex gap-[16px] items-center pt-[2rem]">
        <Button
          variant="outlined"
          onClick={() => navigate("/business-mgt")}
          sx={{
            borderRadius: "8px",
            textTransform: "capitalize",
            fontFamily: "Open Sans, sans-serif",
            height: "40px",
            border: "1px solid #E4E7EC",
            padding: "10px",
            color: "#101928",
            fontWeight: 600,
            fontSize: "14px",
          }}
          startIcon={<IoIosArrowRoundBack />}
        >
          Go back
        </Button>
        <div className="flex gap-[8px]">
          <Typography
            color="#98A2B3"
            fontSize={14}
            fontWeight={600}
            fontFamily="Open Sans, sans-serif"
          >
            Business Management
          </Typography>
          <span>
            <Typography
              color="#98A2B3"
              fontSize={14}
              fontWeight={500}
              fontFamily="Open Sans, sans-serif"
            >
              /
            </Typography>
          </span>
          <Typography
            color="#0D3B6E"
            fontSize={14}
            fontWeight={600}
            fontFamily="Open Sans, sans-serif"
          >
            Business Details
          </Typography>
        </div>
      </div>

      <div className="mt-[2rem]">
        {details && <Business_tabs details={details?.details} />}
      </div>
    </Pages>
  );
};

export default Business;
