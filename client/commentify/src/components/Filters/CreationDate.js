import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import React from "react";

function CreationDate({ value, handleChange }) {
  return (
    <div>
      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">Choose date</FormLabel>
        <RadioGroup
          value={value}
          onChange={handleChange}
          aria-labelledby="demo-radio-buttons-group-label"
          name="radio-buttons-group"
        >
          <FormControlLabel value="today" control={<Radio />} label="Today" />
          <FormControlLabel
            value="week"
            control={<Radio />}
            label="This week"
          />
          <FormControlLabel
            value="month"
            control={<Radio />}
            label="This month"
          />
        </RadioGroup>
      </FormControl>
    </div>
  );
}

export default CreationDate;
