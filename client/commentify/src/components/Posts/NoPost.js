import React from "react";

import classes from "./Posts.module.css";

function NoPost(props) {
  return (
    <div className={classes.notFound}>
      <h2>
        Posts <span>Not</span> Found
      </h2>
      <p>Please try again later or change your filters</p>
    </div>
  );
}

export default NoPost;
