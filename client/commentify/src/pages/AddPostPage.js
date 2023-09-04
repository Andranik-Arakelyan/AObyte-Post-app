import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUser } from "../features/user/userSlice";

import { Footer } from "../components";
import { Header } from "../components";
import { AddPost } from "../components";

import { LOGIN_PAGE } from "../constants/path";

function AddPostPage(props) {
  const user = useSelector(getUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.auth && !user.fetching) {
      navigate(LOGIN_PAGE);
    }
  }, [user.auth, navigate]);

  return (
    !user.fetching &&
    user.auth && (
      <div className="container">
        <Header searchBar={true} />
        <AddPost />
        <Footer />
      </div>
    )
  );
}

export default AddPostPage;
