import React, { useState } from "react";
import Suspension from "../../modals/admin/Suspension";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { CiMenuKebab } from "react-icons/ci";
import Edit from "../../modals/admin/Edit";
import Remove from "../../modals/admin/Remove";
import ChangePassword from "../../modals/admin/ChangePassword";

const Actions = () => {
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
        sx={{ paddingX: ".5rem" }}
      >
        <MenuItem>
          <Edit />
        </MenuItem>
        <MenuItem>
          <ChangePassword />
        </MenuItem>
        <MenuItem>
          <Suspension />
        </MenuItem>
        <MenuItem>
          <Remove />
        </MenuItem>
      </Menu>
    </>
  );
};

export default Actions;
