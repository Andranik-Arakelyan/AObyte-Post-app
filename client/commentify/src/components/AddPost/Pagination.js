import React from "react";

import InButton from "../../UI/InButton";

import Next from "@mui/icons-material/ArrowForwardIos";
import Previous from "@mui/icons-material/ArrowBack";

import classes from "./AddPost.module.css";

function Pagination({
  currentPage,
  toPrevPage,
  toNextPage,
  submitting,
  handleSubmit,
}) {
  return (
    <div className={classes.pageActions}>
      {currentPage > 1 && (
        <InButton type="button" onClick={toPrevPage}>
          <Previous />
          <span>Previous</span>
        </InButton>
      )}
      {currentPage < 4 && (
        <InButton type="button" onClick={toNextPage}>
          <span>Next</span>
          <Next />
        </InButton>
      )}
      {currentPage === 4 && (
        <button
          className={classes.submitBtn}
          type="submit"
          disabled={submitting}
          onClick={handleSubmit}
        >
          {submitting ? "Submitting" : "Submit"}
        </button>
      )}
    </div>
  );
}

export default Pagination;
