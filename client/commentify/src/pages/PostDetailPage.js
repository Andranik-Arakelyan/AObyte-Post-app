import React from "react";

import { useSelector } from "react-redux";
import { getLoginModalStatus } from "../features/loginModal/loginModalSlice";

import { Header, Login, Footer, PostDetail } from "../components";

function PostDetailPage(props) {
  const loginModal = useSelector(getLoginModalStatus);

  return (
    <div className="container">
      <Header searchBar={true} addPostButton={true} />
      {loginModal && <Login />}
      {<PostDetail />}
      <Footer />
    </div>
  );
}

export default PostDetailPage;
