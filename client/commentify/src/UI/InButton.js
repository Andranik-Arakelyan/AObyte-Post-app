import React from "react";
import classes from "./InButton.module.css";

function InButton({ onClick, type, children }) {
  return (
    <button onClick={onClick} className={classes.Button} type={type}>
      {children}
    </button>
  );
}

export default InButton;
