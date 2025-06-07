import React, { useState } from "react";
import Delete from "../../modals/business/Delete";
import Suspension from "../../modals/business/Suspension";
import View from "../../modals/business/View";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { CiMenuKebab } from "react-icons/ci";

interface BusinessState {
  first_name: string;
  last_name: string;
  phone_number: string;
  id: string;
  suspended: boolean;
  createdAt: string;
}

interface ActionsProps {
  businessData: BusinessState;
}

const Actions: React.FC<ActionsProps> = ({ businessData }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton onClick={handleClick}>
        <CiMenuKebab />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{ sx: { borderRadius: 2, width: "170px" } }}
        sx={{ width: "170px" }}
      >
        <MenuItem>
          <Delete businessData={businessData} />
        </MenuItem>
        <MenuItem>
          <Suspension />
        </MenuItem>
        <MenuItem>
          <View />
        </MenuItem>
      </Menu>
    </>
  );
};

export default Actions;
