import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUser } from "../features/user/userSlice";

import { Header, MyPosts, Footer } from "../components";

import { HOME_PAGE } from "../constants/path";

function MyPostsPage(props) {
  const user = useSelector(getUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.auth && !user.fetching) {
      navigate(HOME_PAGE);
    }
  }, [user.auth, navigate, user.fetching]);

  return (
    <div className="container">
      <Header searchBar={true} addPostButton={true} />
      {user.auth && <MyPosts />}
      <Footer />
    </div>
  );
}

export default MyPostsPage;
