import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  Chip,
  Typography,
  InputAdornment,
  Box,
  Skeleton,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import Pages from "../container/Pages";
import { FiSearch } from "react-icons/fi";
// import { FiFilter } from "react-icons/fi";
import Actions from "../components/business_mgt/Actions";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import api from "../utils/axiosInstance";

interface BusinessState {
  first_name: string;
  last_name: string;
  phone_number: string;
  id: string;
  suspended: boolean;
  createdAt: string;
}

const Business_Mgt = () => {
  const navigate = useNavigate();

  const [businesses, setBusinesses] = useState<BusinessState[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const getBusinesses = async () => {
    setLoading(true);
    try {
      const response = await api.get("/api/business/getList");

      if (response.data) {
        setBusinesses(response.data.businesses);
        return;
      }
    } catch (error: any) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBusinesses();
  }, []);

  const filteredBusinesses = useMemo(() => {
    let results = businesses;

    if (searchQuery.trim()) {
      results = results?.filter((business) =>
        `${business.first_name} ${business.last_name} ${business.phone_number}`
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      );
    }

    if (statusFilter === "active") {
      results = results?.filter((business) => !business.suspended);
    } else if (statusFilter === "suspended") {
      results = results?.filter((business) => business.suspended);
    }

    return results;
  }, [searchQuery, statusFilter, businesses]);

  return (
    <Pages page="Business Management">
      <div className="flex justify-between items-center py-[1rem] gap-4 flex-wrap">
        <TextField
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search business"
          size="small"
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px",
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FiSearch />
              </InputAdornment>
            ),
          }}
        />

        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={statusFilter}
            label="Status"
            onChange={(e) => setStatusFilter(e.target.value)}
            sx={{
              borderRadius: "8px",
              backgroundColor: "#fff",
            }}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="suspended">Suspended</MenuItem>
          </Select>
        </FormControl>
      </div>

      <TableContainer
        sx={{ borderRadius: "8px", border: "0.5px solid #D0D5DD" }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table" size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#F0F2F5", height: "45px" }}>
              <TableCell>Name</TableCell>
              <TableCell align="left">Phone number</TableCell>
              {/*should be address*/}
              {/* <TableCell align="left">Transactions</TableCell>
              <TableCell align="left">Accuracy</TableCell> */}
              <TableCell align="left">Status</TableCell>
              <TableCell align="left" />
            </TableRow>
          </TableHead>

          <TableBody>
            {loading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index}>
                  {Array.from({ length: 5 }).map((__, idx) => (
                    <TableCell key={idx}>
                      <Skeleton variant="text" width="100%" height={30} />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : filteredBusinesses && filteredBusinesses.length > 0 ? (
              filteredBusinesses.map((business) => (
                <TableRow
                  key={business.id}
                  sx={{
                    height: "50px",
                    "&:last-child td, &:last-child th": { border: 0 },
                    "&:hover": {
                      cursor: "pointer",
                    },
                  }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    onClick={() => navigate(`/business/${business.id}`)}
                  >
                    <Typography
                      color="#101928"
                      sx={{ fontFamily: "Open Sans, sans-serif" }}
                      fontWeight={500}
                      fontSize={14}
                    >
                      {`${business.first_name} ${business.last_name}`}
                    </Typography>
                  </TableCell>
                  <TableCell
                    align="left"
                    onClick={() => navigate(`/business/${business.id}`)}
                  >
                    <Typography
                      color="#344054"
                      sx={{ fontFamily: "Open Sans, sans-serif" }}
                      fontWeight={400}
                      fontSize={14}
                    >
                      {business.phone_number}
                    </Typography>
                  </TableCell>
                  {/* <TableCell
                    align="left"
                    onClick={() => navigate(`/business/${business.id}`)}
                  >
                    <Typography
                      color="#344054"
                      sx={{ fontFamily: "Open Sans, sans-serif" }}
                      fontWeight={400}
                      fontSize={14}
                    >
                      {business.transactions}
                    </Typography>
                  </TableCell>
                  <TableCell
                    align="left"
                    onClick={() => navigate(`/business/${business.id}`)}
                  >
                    <Typography
                      color="#344054"
                      sx={{ fontFamily: "Open Sans, sans-serif" }}
                      fontWeight={400}
                      fontSize={14}
                    >
                      {business.accuracy}
                    </Typography>
                  </TableCell> */}
                  <TableCell
                    align="left"
                    onClick={() => navigate(`/business/${business.id}`)}
                  >
                    <Chip
                      label={business.suspended ? "Suspended" : "Active"}
                      sx={{
                        backgroundColor: business.suspended
                          ? "#FEEDE6"
                          : "#E6F4EA",
                        color: business.suspended ? "#D33E08" : "#27AE60",
                        fontWeight: 600,
                        fontSize: "14px",
                        fontFamily: "Open Sans, sans-serif",
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Actions
                      businessData={business}
                      refreshBusiness={getBusinesses}
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5}>
                  <Box textAlign="center" py={4}>
                    <Typography variant="body1" color="textSecondary">
                      {searchQuery
                        ? "No matching businesses found."
                        : "No businesses found."}
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Pages>
  );
};

export default Business_Mgt;
