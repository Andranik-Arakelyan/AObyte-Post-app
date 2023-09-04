import React from "react";

import { Header, Posts, Login, Filters, Footer } from "../components";

import { useSelector } from "react-redux";
import { getLoginModalStatus } from "../features/loginModal/loginModalSlice";

import classes from "../components/Posts/Posts.module.css";

function HomePage(props) {
  const loginModalOpen = useSelector(getLoginModalStatus);

  return (
    <div className="container">
      {loginModalOpen && <Login />}
      <Header searchBar={true} addPostButton={true} />
      <div className={classes.main}>
        <div className={classes.filter}>
          <Filters />
        </div>
        <Posts />
      </div>
      <Footer />
    </div>
  );
}

export default HomePage;
