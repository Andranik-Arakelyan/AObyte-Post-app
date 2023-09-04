import React from "react";
import classes from "./AddPost.module.css";

function Page2({ formik }) {
  return (
    <div className={classes.page2}>
      <textarea
        id="description"
        name="description"
        value={formik.values.description}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        placeholder="Describe your post, what's it about?"
      />
      {formik.touched.description && formik.errors.description ? (
        <p>{formik.errors.description}</p>
      ) : null}
    </div>
  );
}

export default Page2;
