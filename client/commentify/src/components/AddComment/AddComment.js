// import React, { useState } from "react";
//import SendIcon from '@mui/icons-material/Send';

// import Rating from "@mui/material/Rating";
// import Typography from "@mui/material/Typography";
// import CircularProgress from "@mui/material/CircularProgress";

// import InButton from "../../UI/InButton";
// // import { addCom } from "../../features/postsSlice";
// import { useDispatch } from "react-redux";

// import send from "../../assets/send.png";

// import classes from "./AddComment.module.css";

// function AddComment({ id }) {
//   const [comment, setComment] = useState("");
//   const [ratingValue, setRatingValue] = useState(5);
//   const [sending, setSending] = useState(false);

//   const dispatch = useDispatch();

//   const resetState = () => {
//     setComment("");
//     setRatingValue(5);
//     setSending(false);
//   };

//   const commentChangeHandler = (value) => {
//     setComment(value);
//   };

//   const addCommentHandler = () => {
//     if (comment !== "") {
//       setSending(true);

//       const newComment = {
//         comment: comment,
//         rating: ratingValue,
//       };

//       dispatch(addCom(id, newComment));
//       resetState();
//       setSending(false);
//     }
//   };

//   return (
//     <div className={classes.container}>
//       <textarea
//         value={comment}
//         placeholder="What do you think about this?"
//         onChange={(e) => commentChangeHandler(e.target.value)}
//       />
//       <div>
//         <Typography component="legend">Rate this post</Typography>
//         <Rating
//           name="simple-controlled"
//           disabled={sending}
//           value={ratingValue}
//           precision={0.2}
//           onChange={(event, newValue) => {
//             setRatingValue(newValue);
//           }}
//         />
//       </div>
//       {sending ? (
//         <CircularProgress />
//       ) : (
//         <InButton onClick={addCommentHandler}>
{
  /* <SendIcon color="primary"/>           */
}

//         </InButton>
//       )}
//     </div>
//   );
// }

// export default AddComment;
