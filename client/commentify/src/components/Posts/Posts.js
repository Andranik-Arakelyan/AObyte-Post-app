import React, { useMemo, useState } from "react";

import { Post } from "../../components";
import Pagination from "@mui/material/Pagination";

import classes from "./Posts.module.css";
import { useSelector } from "react-redux";
import { getSearchValue } from "../../features/search/searchSlice";
import { selectPosts } from "../../features/posts/postsSlice";

function Posts(props) {
  const [currentPage, setCurrentPage] = useState(1);

  const postEachPage = 3;

  const searchValue = useSelector(getSearchValue);

  const { posts } = useSelector(selectPosts);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      return post.title.toLowerCase().includes(searchValue.toLowerCase());
    });
  }, [searchValue, posts]);

  const drawPosts = (posts) => {
    return posts.map((post) => {
      return <Post key={post.id} post={post} />;
    });
  };

  const changePage = (e, pageNumber) => {
    if (pageNumber !== currentPage) {
      setCurrentPage(pageNumber);
    }
  };

  const drawPagination = (n) => {
    return (
      <Pagination
        sx={{ display: "flex", justifyContent: "center" }}
        count={n}
        page={currentPage}
        onChange={changePage}
      />
    );
  };

  const totalPages = Math.ceil(posts.length / postEachPage);
  const showedPosts = posts.slice(
    (currentPage - 1) * postEachPage,
    currentPage * postEachPage
  );

  return (
    <section className={classes.container}>
      <ul className={classes.posts}>
        {searchValue.trim() ? drawPosts(filteredPosts) : drawPosts(showedPosts)}
      </ul>
      {!searchValue.trim() && (
        <ul style={{ marginTop: "40px" }}>{drawPagination(totalPages)}</ul>
      )}
    </section>
  );
}

export default Posts;
