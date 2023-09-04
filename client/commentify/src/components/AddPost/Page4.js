import React from "react";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";

import classes from "./AddPost.module.css";

function Page4({ formik }) {
  return (
    <div className={classes.page4}>
      <h3>Upload a cover photo</h3>
      <div className={classes.uploadContainer}>
        {formik.values.uploadedPhoto && (
          <div className={classes.uploadedImage}>
            <img
              src={URL.createObjectURL(formik.values.uploadedPhoto)}
              alt="Preview"
            />
          </div>
        )}
        <label className={classes.fileLabel} htmlFor="uploadedPhoto">
          <AddAPhotoIcon />
        </label>
        <input
          id="uploadedPhoto"
          name="uploadedPhoto"
          type="file"
          className={classes.fileInput}
          onChange={(event) => {
            formik.setFieldValue("uploadedPhoto", event.currentTarget.files[0]);
          }}
        />
      </div>
      {formik.touched.uploadedPhoto && formik.errors.uploadedPhoto ? (
        <p>{formik.errors.uploadedPhoto}</p>
      ) : null}
    </div>
  );
}

export default Page4;
