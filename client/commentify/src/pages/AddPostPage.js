import React, { useEffect } from "react";
import { Header } from "../components";
import { AddPost } from "../components";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUser } from "../features/user/userSlice";
import { HOME_PAGE, LOGIN_PAGE } from "../constants/path";

function AddPostPage(props) {
  const user = useSelector(getUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.auth && !user.fetching) {
      console.log("NAVIGATED");
      navigate(LOGIN_PAGE);
    }
  }, [user.auth, navigate]);

  return (
    !user.fetching &&
    user.auth && (
      <>
        <Header searchBar={true} />
        <AddPost />
      </>
    )
  );
}

export default AddPostPage;
