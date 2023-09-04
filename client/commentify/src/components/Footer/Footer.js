import React from "react";

import logo from "../../assets/footer_logo.png";
import facebook from "../../assets/facebook.png";
import instagram from "../../assets/instagram.png";
import twitter from "../../assets/twitter.png";
import telegram from "../../assets/telegram.png";

import classes from "./Footer.module.css";
import { links } from "../../constants";

function Footer(props) {
  const renderLinks = () => {
    return links.map((link, id) => {
      return (
        <li key={id}>
          <span>{link}</span>
        </li>
      );
    });
  };

  return (
    <div className={classes.container}>
      <div className={classes.logo}>
        <img src={logo} />
      </div>
      <ul className={classes.links}>{renderLinks()}</ul>
      <div className={classes.social}>
        <div>
          <img src={facebook} />
          <span>Facebook</span>
        </div>
        <div>
          <img src={instagram} />
          <span>Instagram</span>
        </div>
        <div>
          <img src={twitter} />
          <span>Twitter</span>
        </div>
        <div>
          <img src={telegram} />
          <span>Telegram</span>
        </div>
      </div>
    </div>
  );
}

export default Footer;
