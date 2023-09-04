import React, { useEffect, useRef } from "react";

import { Link } from "react-router-dom";

import classes from "./Header.module.css";

function FoundPosts({ posts, showFounds, close, inputRef }) {
  const listRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        listRef.current &&
        !listRef.current.contains(event.target) &&
        event.target !== inputRef.current
      ) {
        close();
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const renderFoundPosts = () => {
    return posts.map((post) => {
      return (
        <Link key={post._id} to={`/posts/${post._id}`}>
          <li>{post.title}</li>
        </Link>
      );
    });
  };

  return (
    !!posts.length && (
      <ul
        ref={listRef}
        className={`${classes.foundList} ${!showFounds ? classes.hidden : ""}`}
      >
        {renderFoundPosts()}
      </ul>
    )
  );
}

export default FoundPosts;
