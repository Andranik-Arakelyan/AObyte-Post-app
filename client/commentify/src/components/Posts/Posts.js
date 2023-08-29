import React, { useEffect, useMemo, useState } from "react";

// import { Post } from "../../components";
import Pagination from "@mui/material/Pagination";

import classes from "./Posts.module.css";
import { useSelector } from "react-redux";
import { getSearchValue } from "../../features/search/searchSlice";
import { selectPosts } from "../../features/posts/postsSlice";
import { fetchPosts } from "./PostsApi";
import PostCard from "../PostCard/PostCard";

function Posts(props) {
  const [fetching, setFetching] = useState(false);
  const [posts, setPosts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const searchValue = useSelector(getSearchValue);

  useEffect(() => {
    setFetching(true);
    fetchPosts(1).then((postsData) => {
      setPosts(postsData.data.posts);
      setTotalPages(postsData.data.totalPages);
      setFetching(false);
    });
  }, []);

  // const { posts } = useSelector(selectPosts);

  // const filteredPosts = useMemo(() => {
  //   return posts.filter((post) => {
  //     return post.title.toLowerCase().includes(searchValue.toLowerCase());
  //   });
  // }, [searchValue, posts]);

  const drawPosts = () => {
    return posts.map((post) => {
      return <PostCard key={post._id} postData={post} />;
    });
  };

  const changePage = (e, pageNumber) => {
    if (pageNumber !== currentPage) {
      setFetching(true);

      fetchPosts(pageNumber).then((postsData) => {
        setPosts(postsData.data.posts);
        setTotalPages(postsData.data.totalPages);
        setFetching(false);
      });
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

  // const totalPages = Math.ceil(posts.length / postEachPage);
  // const showedPosts = posts.slice(
  //   (currentPage - 1) * postEachPage,
  //   currentPage * postEachPage
  // );

  return (
    !fetching && (
      <section className={classes.container}>
        <ul className={classes.posts}>{drawPosts()}</ul>
        {drawPagination(totalPages)}
        {/* <ul className={classes.posts}>
        {searchValue.trim() ? drawPosts(filteredPosts) : drawPosts(showedPosts)}
      </ul>
      {!searchValue.trim() && (
        <ul style={{ marginTop: "40px" }}>{drawPagination(totalPages)}</ul>
      )} */}
      </section>
    )
  );
}

export default Posts;
