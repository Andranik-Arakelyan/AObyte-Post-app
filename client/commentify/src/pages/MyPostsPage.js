import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { getUser } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";
import { HOME_PAGE } from "../constants/path";
import { Header } from "../components";
import MyPosts from "../components/MyPosts/MyPosts";

function MyPostsPage(props) {
  const user = useSelector(getUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.auth && !user.fetching) {
      navigate(HOME_PAGE);
    }
  }, [user.auth, navigate, user.fetching]);

  return (
    <div>
      <Header searchBar={true} addPostButton={true} />
      {user.auth && <MyPosts />}
    </div>
  );
}

export default MyPostsPage;
