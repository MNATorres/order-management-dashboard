import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Calendar() {
  const today = new Date();
  const nextMonth = new Date();
  nextMonth.setMonth(nextMonth.getMonth() + 1);

  const [startDate, setStartDate] = useState<Date | null>(today);
  const [endDate, setEndDate] = useState<Date | null>(nextMonth);

  useEffect(() => {
    if (startDate) {
      const newEndDate = new Date(startDate);
      newEndDate.setMonth(newEndDate.getMonth() + 1);
      setEndDate(newEndDate);
    }
  }, [startDate]);

  return (
    <Box
      sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          dateFormat="dd/MM/yyyy"
          placeholderText="Inicio"
        />
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          dateFormat="dd/MM/yyyy"
        />
      </Box>
      <Box>
        <Button sx={{ marginTop: 2 }} variant="contained">
          Apli
        </Button>
      </Box>
    </Box>
  );
}
