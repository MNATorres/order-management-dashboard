import { Box, Button } from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useFilteredOrders } from "./../../hooks/useFilterOrders";
import { Filter } from "../../domain/Filters";

export default function Calendar() {
  const { setStartDate, setEndDate, filterOrders, startDate, endDate } = useFilteredOrders();


  const handleApplyFilters = () => {
    filterOrders(Filter.Traveling);
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date ?? undefined)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          dateFormat="dd/MM/yyyy"
          placeholderText="dd/MM/yyyy"
        />
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date ?? undefined)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          dateFormat="dd/MM/yyyy"
          placeholderText="dd/MM/yyyy"
        />
      </Box>
      <Box>
        <Button
          sx={{ marginTop: 2 }}
          variant="contained"
          onClick={handleApplyFilters}
        >
          Aplicar Filtros
        </Button>
      </Box>
    </Box>
  );
}
