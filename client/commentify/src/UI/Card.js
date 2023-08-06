import React from "react";

import classes from "./Card.module.css";

function Card({ disabled, modal, children }) {
  return (
    <div className={`${classes.card} ${classes[disabled]} ${classes[modal]}`}>
      {children}
    </div>
  );
}

export default Card;
