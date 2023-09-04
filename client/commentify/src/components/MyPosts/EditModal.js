import React, { useState } from "react";

import {
  AppBar,
  Button,
  Dialog,
  FormControlLabel,
  IconButton,
  Input,
  Radio,
  RadioGroup,
  Slide,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";

import { useFormik } from "formik";
import postSchema from "../../Validation/newPost";

import { editPost } from "./PostApi";

import { categories } from "../../constants";

import classes from "./MyPosts.module.css";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function EditModal({ handleModalCLose, post, toggleConfirm }) {
  const [submitting, setSubmitting] = useState(false);

  const renderCategories = () => {
    return categories.map((category) => {
      return (
        <FormControlLabel
          key={category.name}
          value={category.name}
          control={<Radio />}
          label={category.label}
        />
      );
    });
  };

  const formik = useFormik({
    initialValues: {
      title: post.title,
      description: post.description,
      category: post.category,
      uploadedPhoto: "",
      isPublic: post.isPublic,
    },
    validationSchema: postSchema,
    onSubmit: (values, { setFieldError }) => {
      setSubmitting(true);
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("category", values.category);
      formData.append("uploadedPhoto", values.uploadedPhoto);
      formData.append("isPublic", values.isPublic);
      formData.append("creatorId", post.creatorId);

      editPost(post._id, formData).then((data) => {
        if (data.status === "SUCCESS") {
          toggleConfirm();
          handleModalCLose();
        } else {
          if (data.message) {
            return alert(data.message);
          }
          Object.entries(data.errors).forEach((error) => {
            setFieldError(error[0], error[1]);
          });
        }
        setSubmitting(false);
      });
    },
  });

  return (
    <Dialog
      fullScreen
      open={true}
      onClose={handleModalCLose}
      TransitionComponent={Transition}
      sx={{ zIndex: "5000" }}
    >
      <AppBar sx={{ backgroundColor: "#FE6257" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleModalCLose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Edit post
          </Typography>
          <Button
            color="inherit"
            disabled={submitting}
            onClick={formik.handleSubmit}
          >
            Save changes
          </Button>
        </Toolbar>
      </AppBar>
      <div className={classes.editFormContainer}>
        <form>
          <div className={classes.field}>
            <TextField
              error={!!formik.errors.title}
              name="title"
              label="Title"
              variant="outlined"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.title && formik.errors.title ? (
              <p>{formik.errors.title}</p>
            ) : null}
          </div>

          <div className={classes.field}>
            <TextField
              error={!!formik.errors.description}
              name="description"
              label="Description"
              multiline
              rows={5}
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.description && formik.errors.description ? (
              <p>{formik.errors.description}</p>
            ) : null}
          </div>

          <div>
            <RadioGroup
              name="category"
              defaultValue={formik.initialValues.category}
              value={formik.values.category}
              onChange={formik.handleChange}
            >
              <div className={classes.categories}>{renderCategories()}</div>
            </RadioGroup>
          </div>

          <div className={classes.uploadContainer}>
            <label className={classes.fileLabel} htmlFor="uploadedPhoto">
              <AddAPhotoIcon />
            </label>

            <input
              id="uploadedPhoto"
              name="uploadedPhoto"
              type="file"
              style={{ display: "none" }}
              onChange={(event) => {
                formik.setFieldValue(
                  "uploadedPhoto",
                  event.currentTarget.files[0]
                );
              }}
            />

            <div className={classes.uploadContainer}>
              <img
                src={
                  formik.values.uploadedPhoto
                    ? URL.createObjectURL(formik.values.uploadedPhoto)
                    : post.image_url
                }
              />
            </div>
            {formik.touched.uploadedPhoto && formik.errors.uploadedPhoto ? (
              <p>{formik.errors.uploadedPhoto}</p>
            ) : null}
          </div>
        </form>
      </div>
    </Dialog>
  );
}

export default EditModal;
