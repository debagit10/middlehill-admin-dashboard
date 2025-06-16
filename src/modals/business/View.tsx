import { Icon, Typography } from "@mui/material";
import { CiViewBoard } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

interface BusinessState {
  id: string;
}

const View: React.FC<BusinessState> = ({ id }) => {
  const navigate = useNavigate();
  return (
    <div
      className="flex gap-[4px] text-[#344054]"
      onClick={() => navigate(`/business/${id}`)}
    >
      <Icon>
        <CiViewBoard
          style={{ stroke: "currentColor", strokeWidth: 2 }}
          className="w-[16.76px] h-[16.76px] pt-[2.5px]"
        />
      </Icon>

      <Typography
        fontWeight={600}
        fontSize={14}
        fontFamily="Open Sans, sans-serif"
      >
        View
      </Typography>
    </div>
  );
};

export default View;
