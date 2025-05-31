import { Chip, TextField, Typography } from "@mui/material";

interface LabeledInputProps {
  label: string;
  fullWidth?: boolean;
  type?: string;
  value: string;
}

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
    { label: "Email Address", value: "john.doe@example.com" },
    { label: "Phone Number", value: "+1234567890" },
  ],
  [
    { label: "Username", value: "johndoe" },
    { label: "Country", value: "USA" },
  ],
];

const singleInput = {
  label: "Bank Info",
  value: "2170808477 United Bank of Africa (UBA)",
};

const Overview = () => {
  return (
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
            <LabeledInput label={singleInput.label} value={singleInput.value} />
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
          label="Active Today"
          sx={{
            backgroundColor: "#E6F4EA",
            color: "#27AE60",
            fontWeight: 600,
            fontSize: "14px",
            fontFamily: "Open Sans, sans-serif",
          }}
        />
      </div>
    </div>
  );
};

export default Overview;
