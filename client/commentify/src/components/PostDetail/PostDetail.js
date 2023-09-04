import React, { useEffect, useState } from "react";

import { getUser } from "../../features/user/userSlice";
import { useSelector } from "react-redux";

import { useParams } from "react-router-dom";

import { Divider } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

import AddComment from "./AddComment";
import Comments from "./Comments";

import { fetchPostDetails } from "./PostDetailApi";

import { NO_IMAGE_URL } from "../../constants";

import { getDateForm } from "../../helpers";

import classes from "./PostDetail.module.css";

function PostDetail(props) {
  const { postId } = useParams();
  const [loading, setLoading] = useState(true);
  const [postData, setPostData] = useState(null);
  const [comments, setComments] = useState([]);

  const user = useSelector(getUser);

  const userId = user.userData ? user.userData._id : "";

  useEffect(() => {
    fetchPostDetails(postId, userId)
      .then(({ data }) => {
        if (data.status === "SUCCESS") {
          setPostData(data.postData);
          setComments(data.comments);
          setLoading(false);
        } else {
          alert(data.message);
        }
      })
      .catch((error) => console.log(error));
  }, [userId]);

  const updateComments = (action, comment) => {
    if (action === "add") {
      setComments((prevComments) => [...prevComments, comment]);
    } else if (action === "delete") {
      const filtered = comments.filter((com) => com._id !== comment._id);
      setComments(filtered);
    } else {
      const editedIndex = comments.findIndex((com) => com._id === comment._id);
      const updatedComments = [...comments];
      updatedComments[editedIndex] = comment;
      setComments(updatedComments);
    }
  };

  console.log(postData);

  return (
    !loading && (
      <div className={classes.container}>
        <div className={classes.heading}>
          <h3>{postData.title}</h3>
        </div>

        <div className={classes.description}>
          <p>{postData.description}</p>
        </div>
        <div className={classes.postImage}>
          <img src={postData.image_url || NO_IMAGE_URL} alt="post" />
        </div>
        <Divider />
        <Comments comments={comments} updateComments={updateComments} />
        <AddComment postId={postId} updateComments={updateComments} />
      </div>
    )
  );
}

export default PostDetail;
