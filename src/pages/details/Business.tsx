import Pages from "../../container/Pages";
import { Button, Typography } from "@mui/material";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Business = () => {
  const navigate = useNavigate();
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
    </Pages>
  );
};

export default Business;
