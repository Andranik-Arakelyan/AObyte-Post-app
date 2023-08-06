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

const AddPostModal = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [uploaded, setUploaded] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("SUBMITED");
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
            <h3>Describe your post, what's it about?</h3>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
            />
          </div>
        );
      case 3:
        return (
          <div>
            <h3>You can upload an image for cover</h3>
            <label htmlFor="upload">
              <InButton>
                <AddAPhotoIcon />
              </InButton>
            </label>
            <input
              id="upload"
              type="file"
              value={uploaded}
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
            <InButton>
              <CloseIcon />
            </InButton>
          </div>
        </div>
        <div className={classes.profileInfo}>
          <Avatar src={getRandomAvatar()} alt="ava" />
          <span>Name Surname</span>
        </div>
        <form onSubmit={handleSubmit} className={classes.formPart}>
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
                <Next color="primary" />
              </InButton>
            )}
            {currentPage === 3 && <InButton type="submit">Submit</InButton>}
          </div>
        </form>
      </div>
    </Card>
  );
};

function AddPost(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [uploaded, setUploaded] = useState(null);

  const dispatch = useDispatch();

  const handleTitleChange = (value) => {
    setTitle(value);
  };

  const handleDescriptionChange = (value) => {
    setDescription(value);
  };

  const handleUploadedChange = (e) => {
    setUploaded(e.target.files[0]);
  };

  const handlePostUpload = (e) => {
    e.preventDefault();

    const uploadingFiles = {
      title,
      description,
      image: uploaded,
    };

    // addPostWithImage(uploadingFiles)
    //   .then((res) => {})
    //   .catch((err) => console.log("CHEXAVVV"));
  };

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
    // <div className={classes.container}>
    //   <div className={classes.toBack}>
    //     <InButton>
    //       <KeyboardBackspaceIcon />
    //       BACK
    //     </InButton>
    //   </div>

    //   <div
    //     style={{
    //       display: "flex",
    //       justifyContent: "center",
    //       margin: "50px 45px",
    //     }}
    //   >
    //     <form
    //       encType="multipart/form-data"
    //       onSubmit={handlePostUpload}
    //       style={{ display: "flex", flexDirection: "column", gap: "25px" }}
    //     >
    //       <input
    //         name="title"
    //         type="text"
    //         placeholder="Title"
    //         onChange={(e) => handleTitleChange(e.target.value)}
    //       />
    //       <input
    //         name="description"
    //         type="text"
    //         placeholder="description"
    //         onChange={(e) => handleDescriptionChange(e.target.value)}
    //       />
    //       <input
    //         name="image"
    //         type="file"
    //         onChange={(e) => handleUploadedChange(e)}
    //       />
    //       <button type="submit">Post It</button>
    //     </form>
    //   </div>
    // </div>
  );
}

export default AddPost;
