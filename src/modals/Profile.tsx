import { Avatar } from "@mui/material";
import logo from "../logo/logo.png";

const Profile = () => {
  return (
    <div>
      <Avatar alt="Remy Sharp" src={logo} sx={{ width: 24, height: 24 }} />
    </div>
  );
};

export default Profile;
