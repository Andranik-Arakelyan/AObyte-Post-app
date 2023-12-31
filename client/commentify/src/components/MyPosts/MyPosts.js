import React, { useEffect, useState } from "react";

import { fetchUserPosts } from "../Profile/fetchPosts";
import { useSelector } from "react-redux";
import { getUser } from "../../features/user/userSlice";

import Post from "../Profile/Post";
import EditModal from "./EditModal";
import ConfirmModal from "./ConfirmModal";

import SpeedDial from "@mui/material/SpeedDial";
import SettingsIcon from "@mui/icons-material/Settings";
import EditIcon from "@mui/icons-material/Edit";
import PublishIcon from "@mui/icons-material/PublishedWithChanges";
import UnpublisIcon from "@mui/icons-material/UnpublishedOutlined";
import DeleteIcon from "@mui/icons-material/DeleteForever";
import { SpeedDialAction } from "@mui/material";

import { changePublicStatus, deletePost } from "./PostApi";

import classes from "./MyPosts.module.css";

function MyPosts(props) {
  const [fetching, setFetching] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [userPosts, setUserPosts] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [publishModal, setPublishModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [pickedPost, setPickedPost] = useState(null);

  const user = useSelector(getUser);

  useEffect(() => {
    setFetching(true);
    fetchUserPosts().then((data) => {
      setFetching(false);
      setUserPosts(data.posts);
    });
  }, [confirmed]);

  const handleConfirmedChange = () => {
    setConfirmed((prev) => !prev);
  };

  const handleDeleteModalStatus = () => {
    setDeleteModal((prev) => !prev);
  };

  const handleDeleteCLick = (post) => {
    setPickedPost(post);
    handleDeleteModalStatus();
  };

  const handlePublishModalStatus = () => {
    setPublishModal((prev) => !prev);
  };

  const handlePublishClick = (post) => {
    setPickedPost(post);
    handlePublishModalStatus();
  };

  const handleEditModalStatus = () => {
    setEditModal((prev) => !prev);
  };

  const handleEditCLick = (post) => {
    setPickedPost(post);
    handleEditModalStatus();
  };

  const renderPosts = () => {
    if (!userPosts.length) {
      return (
        <p style={{ fontSize: "20px", fontWeight: "500" }}>
          You don't have any created post yet
        </p>
      );
    }
    return userPosts.map((post) => {
      return (
        <div key={post._id} className={classes.postContainer}>
          <Post postData={post} />

          <div className={classes.actions}>
            <SpeedDial
              ariaLabel="SpeedDial openIcon example"
              sx={{ width: "25px" }}
              icon={<SettingsIcon />}
            >
              <SpeedDialAction
                icon={<DeleteIcon />}
                tooltipTitle="Delete"
                onClick={() => handleDeleteCLick(post)}
              />
              <SpeedDialAction
                icon={post.isPublic ? <UnpublisIcon /> : <PublishIcon />}
                tooltipTitle={post.isPublic ? "Unpublish" : "Publish"}
                onClick={() => handlePublishClick(post)}
              />
              <SpeedDialAction
                icon={<EditIcon />}
                tooltipTitle="Edit"
                onClick={() => handleEditCLick(post)}
              />
            </SpeedDial>
          </div>
        </div>
      );
    });
  };

  return (
    <div className={classes.main}>
      {!fetching && <div className={classes.container}>{renderPosts()}</div>}

      {deleteModal && (
        <ConfirmModal
          post={pickedPost}
          handleModalClose={handleDeleteModalStatus}
          message="delete"
          confirmAction={deletePost}
          toggleConfirm={handleConfirmedChange}
        />
      )}
      {publishModal && (
        <ConfirmModal
          post={pickedPost}
          handleModalClose={handlePublishModalStatus}
          message={pickedPost.isPublic ? "unpublish" : "publish"}
          confirmAction={changePublicStatus}
          toggleConfirm={handleConfirmedChange}
        />
      )}
      {editModal && (
        <EditModal
          post={pickedPost}
          handleModalCLose={handleEditModalStatus}
          toggleConfirm={handleConfirmedChange}
        />
      )}
    </div>
  );
}

export default MyPosts;
