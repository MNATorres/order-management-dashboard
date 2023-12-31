import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Typography from "@mui/material/Typography";
import TravelingFilterCalendar from "./TravelingFilterCalendar";
import { Filter } from "../../domain/Filters";

interface OrderFilterProps {
  onFilter: (filterValue: string) => void;
}

export default function OrderFilter({ onFilter }: OrderFilterProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleStatusClick = (status: string) => {
    onFilter(status);
    handleClose();
  };

  return (
    <div>
      <Button
        sx={{ width: "10%" }}
        id="fade-button"
        aria-controls={open ? "fade-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <FilterAltIcon sx={{ fontSize: 20 }} />
      </Button>
      <Menu
        id="fade-menu"
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
        sx={{ textAlign: "center" }}
      >
        <Typography sx={{ fontWeight: 700, fontSize: 13, color: "#1976d2" }}>
          Status
        </Typography>
        <MenuItem onClick={() => handleStatusClick("")}>All Status</MenuItem>
        <MenuItem onClick={() => handleStatusClick(Filter.Approve)}>
          Approve
        </MenuItem>
        <MenuItem onClick={() => handleStatusClick(Filter.Cancel)}>
          Cancel
        </MenuItem>
        <MenuItem onClick={() => handleStatusClick(Filter.Delivery)}>
          Delivery
        </MenuItem>
        <MenuItem sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button sx={{}} onClick={() => handleStatusClick(Filter.Traveling)}>
            Traveling
          </Button>
          <TravelingFilterCalendar />
        </MenuItem>
        {/* <MenuItem onClick={() => handleStatusClick(Filter.DeliverSoon)}>
          Expires in 48 hours
        </MenuItem> */}
      </Menu>
    </div>
  );
}
