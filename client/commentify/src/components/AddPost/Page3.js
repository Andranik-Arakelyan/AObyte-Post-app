import React from "react";

import classes from "./AddPost.module.css";
import { Checkbox, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { categories } from "../../constants";
//className={classes.categories}

function Page3({ formik }) {
  const renderCategories = () => {
    return categories.map((category) => {
      return (
        <FormControlLabel
          key={category}
          value={category}
          control={<Radio />}
          label={category}
        />
      );
    });
  };
  return (
    <div className={classes.page3}>
      <RadioGroup
        name="category"
        defaultValue={formik.initialValues.category}
        value={formik.values.category}
        onChange={formik.handleChange}
      >
        <span className={classes.categories}>{renderCategories()}</span>
      </RadioGroup>
    </div>
  );
}

export default Page3;
