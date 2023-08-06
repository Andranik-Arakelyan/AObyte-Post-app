import classes from "./Backdrop.module.css";
export const Backdrop = (props) => {
  return <div className={classes.backDrop} onClick={props.onClose} />;
};
