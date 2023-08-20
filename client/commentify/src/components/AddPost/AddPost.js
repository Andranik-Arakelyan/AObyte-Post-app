// import { addPostWithImage } from "../api/api";
import React, { useState } from "react";
import ReactDOM from "react-dom";

import InButton from "../../UI/InButton";
import CloseIcon from "@mui/icons-material/Close";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import Avatar from "@mui/material/Avatar";
import Next from "@mui/icons-material/ArrowForwardIos";
import Previous from "@mui/icons-material/ArrowBack";

import classes from "./AddPost.module.css";
import Card from "../../UI/Card";
import { Backdrop } from "../../UI/Backdrop";
import { useDispatch } from "react-redux";
import { closeModal } from "../../features/addPostModal/addPostModalSlice";
import { getRandomAvatar } from "../../helpers";
import { addPost } from "../../features/user/userSlice";

const AddPostModal = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [uploaded, setUploaded] = useState(null);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const uploadingFiles = {
      title,
      description,
      image: uploaded,
    };

    dispatch(addPost(uploadingFiles));
  };

  const toNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const toPrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const renderPageContent = () => {
    switch (currentPage) {
      case 1:
        return (
          <div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Your post title"
            />
          </div>
        );
      case 2:
        return (
          <div>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your post, what's it about?"
            />
          </div>
        );
      case 3:
        return (
          <div className={classes.uploadContainer}>
            <h3>Upload a cover photo</h3>
            <label className={classes.fileLabel} htmlFor="upload">
              <AddAPhotoIcon />
            </label>
            <input
              id="upload"
              type="file"
              className={classes.fileInput}
              onChange={(e) => setUploaded(e.target.files[0])}
            />
          </div>
        );
      default:
        return null;
    }
  };
  return (
    <Card modal="modal">
      <div className={classes.container}>
        <div className={classes.topSide}>
          <h2>
            <span>Create Post</span>
          </h2>
          <div className={classes.close}>
            <InButton onClick={() => dispatch(closeModal())}>
              <CloseIcon />
            </InButton>
          </div>
        </div>
        <div className={classes.profileInfo}>
          <Avatar src={getRandomAvatar()} alt="ava" />
          <span>Name Surname</span>
        </div>
        <form onSubmit={(e) => handleSubmit(e)} className={classes.formPart}>
          {renderPageContent()}
          <div className={classes.pages}>
            {currentPage > 1 && (
              <InButton type="button" onClick={toPrevPage}>
                <Previous />
                <span>Previous</span>
              </InButton>
            )}
            {currentPage < 3 && (
              <InButton type="button" onClick={toNextPage}>
                <span>Next</span>
                <Next />
              </InButton>
            )}
            {currentPage === 3 && (
              <button className={classes.submitBtn} type="submit">
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
    </Card>
  );
};

function AddPost(props) {
  const dispatch = useDispatch();

  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop
          onClose={() => {
            dispatch(closeModal());
          }}
        />,
        document.getElementById("back-drop")
      )}
      {ReactDOM.createPortal(
        <AddPostModal />,
        document.getElementById("modal")
      )}
    </>
  );
}

export default AddPost;
