import * as React from "react";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

export default function CustomDateTimePicker({label, value, onChange, className}) {

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <div className={`flex flex-col my-2 ${className}`}>
        <DateTimePicker label={label} value={value} onChange={onChange} />
      </div>
    </LocalizationProvider>
  );
}
