import React from "react";
import classes from "./AddPost.module.css";
import { Checkbox } from "@mui/material";

function Page1({ formik }) {
  return (
    <div className={classes.page1}>
      <input
        id="title"
        name="title"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.title}
        placeholder="Your post title"
      />
      {formik.touched.title && formik.errors.title ? (
        <p>{formik.errors.title}</p>
      ) : null}
      <span className={classes.public}>
        <Checkbox
          name="isPublic"
          id="isPublic"
          color="success"
          checked={formik.values.isPublic}
          onChange={(event) => {
            formik.setFieldValue("isPublic", !formik.values.isPublic);
          }}
        />
        <label htmlFor="isPublic">
          <span>I want to share post with others</span>
        </label>
      </span>
    </div>
  );
}

export default Page1;
