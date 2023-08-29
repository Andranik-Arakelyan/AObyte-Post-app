import React, { useEffect } from "react";
import { Header, Profile } from "../components";
import { useSelector } from "react-redux";
import { getUser } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";
import { HOME_PAGE } from "../constants/path";

function ProfilePage(props) {
  const user = useSelector(getUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.auth && !user.fetching) {
      navigate(HOME_PAGE);
    }
  }, [user.auth, navigate, user.fetching]);

  return (
    <>
      <Header searchBar={true} addPostButton={true} />
      {user.auth && <Profile />}
    </>
  );
}

export default ProfilePage;
