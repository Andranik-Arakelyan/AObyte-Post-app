import React, { useEffect } from "react";

import CircularProgress from "@mui/material/CircularProgress";

import { Header, Posts, Login, AddPost } from "../components";

import { useDispatch, useSelector } from "react-redux";
import { getLoginModalStatus } from "../features/loginModal/loginModalSlice";
import { downloadPosts, selectPosts } from "../features/posts/postsSlice";
import { getAddPostModalStatus } from "../features/addPostModal/addPostModalSlice";

function HomePage(props) {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(downloadPosts());
  // }, [dispatch]);

  const loginModalOpen = useSelector(getLoginModalStatus);
  const { loading, error } = useSelector(selectPosts);

  if (loading) {
    return (
      <>
        <Header searchBar={true} />
        <CircularProgress />
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

  return (
    <>
      {loginModalOpen && <Login />}
      <Header searchBar={true} addPostButton={true} />
      <Posts />
      {/* <Panel /> */}
    </>
  );
}

export default HomePage;
