import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from "@mui/material";
import React from "react";
import { categories } from "../../constants";

//sx={{ m: 3 }}

function Categories({ handleChange, state }) {
  const renderCategories = (categories) => {
    return categories.map((category) => {
      return (
        <FormControlLabel
          key={category.name}
          control={
            <Checkbox
              checked={state.includes(category.name)}
              onChange={handleChange}
              name={category.name}
            />
          }
          label={category.label}
        />
      );
    });
  };

  return (
    <div>
      <FormControl component="fieldset" variant="standard">
        <FormLabel component="legend">Choose category</FormLabel>
        <FormGroup>{renderCategories(categories)}</FormGroup>
      </FormControl>
    </div>
  );
}

export default Categories;
