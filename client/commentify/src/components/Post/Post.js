import React from "react";

import { Comments } from "../../components";
import Card from "../../UI/Card";

import { Link } from "react-router-dom";

import classes from "./Post.module.css";

function Post({ post }) {
  return (
    // <PostDataContext.Provider value={post}>
    <Card>
      <div className={classes.title}>
        <Link to={`posts/${post.id}`}>
          <h3>{post.title}</h3>
        </Link>
        <p>{post.createdAt}</p>
        <p>{typeof post.createdAt}</p>
      </div>
      <div className={classes.comments}>
        {/* <Comments commentData={post.comments} postId={post.id} /> */}
      </div>
    </Card>
    // </PostDataContext.Provider>
  );
}

export default Post;
