import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../features/user/userSlice";
import { addNewPost } from "../../features/posts/postsSlice";

import postSchema from "../../Validation/newPost";
import Page1 from "./Page1";
import Page2 from "./Page2";
import Page4 from "./Page4";
import Page3 from "./Page3";
import Pagination from "./Pagination";

import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";

import { PROFILE_PAGE } from "../../constants/path";

import UserAvatar from "../UserAvatar/UserAvatar";
import classes from "./AddPost.module.css";

export const AddPost = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [submitting, setSubmitting] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(getUser);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      category: "general",
      uploadedPhoto: "",
      isPublic: false,
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

      dispatch(addNewPost(formData)).then((response) => {
        if (response.payload.status === "SUCCESS") {
          navigate(PROFILE_PAGE);
        } else {
          Object.entries(response.payload.errors).forEach((error) => {
            setFieldError(error[0], error[1]);
          });
        }

        setSubmitting(false);
      });
    },
  });

  const toNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const toPrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const renderPageContent = () => {
    switch (currentPage) {
      case 1:
        return <Page1 formik={formik} />;
      case 2:
        return <Page2 formik={formik} />;
      case 3:
        return <Page3 formik={formik} />;
      case 4:
        return <Page4 formik={formik} />;
      default:
        return null;
    }
  };

  return (
    <div className={classes.main}>
      <div className={classes.container}>
        <div className={classes.titleSide}>
          <h2>
            <span>Create Post</span>
          </h2>
        </div>

        <div className={classes.profileInfo}>
          <UserAvatar userData={user.userData} />
          <span>{user.userData.name}</span>
        </div>

        <div className={classes.formSide}>
          <form>{renderPageContent()}</form>
        </div>

        <div className={classes.paginationSide}>
          <Pagination
            handleSubmit={formik.handleSubmit}
            errors={formik.errors}
            submitting={submitting}
            currentPage={currentPage}
            toNextPage={toNextPage}
            toPrevPage={toPrevPage}
          />
        </div>
      </div>
    </div>
  );
};

export default AddPost;
