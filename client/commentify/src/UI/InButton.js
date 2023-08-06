import React from "react";
import classes from "./InButton.module.css";

function InButton(props) {
  return (
    <button onClick={props.onClick} className={classes.Button}>
      {props.children}
    </button>
  );
}

export default InButton;
