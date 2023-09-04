import React, { useEffect, useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
  downloadPosts,
  selectPosts,
  changePage,
} from "../../features/posts/postsSlice";

import Pagination from "@mui/material/Pagination";
import { CircularProgress } from "@mui/material";

import PostCard from "../PostCard/PostCard";
import Header from "../Header/Header";
import NoPost from "./NoPost";

import { HOME_PAGE } from "../../constants/path";

import classes from "./Posts.module.css";

function Posts(props) {
  const dispatch = useDispatch();
  const { posts, fetching, totalPages, error, page, filters } =
    useSelector(selectPosts);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const currentPage = parseInt(queryParams.get("page")) || 1;

  const postFilters = {};

  Array.from(queryParams.entries()).map(([key, value]) => {
    if (key !== "page") {
      postFilters[key] = value;
    }
  });

  const navigate = useNavigate();

  useEffect(() => {
    try {
      dispatch(downloadPosts({ page: currentPage, filters: postFilters }));
    } catch (error) {
      console.log(error);
    }
  }, [page, filters]);

  if (fetching) {
    return (
      <>
        <Header searchBar={true} addPostButton={true} />
        <div style={{ marginTop: "80px" }}>
          <CircularProgress />
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <p>{error}</p>
      </>
    );
  }

  const drawPosts = () => {
    return posts.map((post) => {
      return <PostCard key={post._id} postData={post} />;
    });
  };

  const changePageNumber = (e, pageNumber) => {
    if (pageNumber !== page) {
      queryParams.set("page", pageNumber);

      navigate(`${HOME_PAGE}?${queryParams.toString()}`);

      dispatch(changePage(pageNumber));
    }
  };

  const drawPagination = (n) => {
    return (
      <Pagination
        sx={{ display: "flex", justifyContent: "center" }}
        count={n}
        page={currentPage}
        onChange={changePageNumber}
      />
    );
  };

  return !fetching && posts.length ? (
    <section className={classes.container}>
      <ul className={classes.posts}>{drawPosts()}</ul>
      {drawPagination(totalPages)}
    </section>
  ) : (
    <NoPost />
  );
}

export default Posts;
