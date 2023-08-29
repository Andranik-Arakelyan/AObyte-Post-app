import * as React from "react";

import IconButton from "@mui/material/IconButton";

import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/ModeComment";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { NO_IMAGE_URL } from "../../constants";
import { useSelector } from "react-redux";
import { getUser } from "../../features/user/userSlice";
import { getDateForm } from "../../helpers";
import { useSpring, animated } from "react-spring";

import classes from "./PostCard.module.css";
import UserAvatar from "../UserAvatar/UserAvatar";
import InButton from "../../UI/InButton";
import { Link } from "react-router-dom";
import { Avatar } from "@mui/material";

// const ExpandMore = styled((props) => {
//   const { expand, ...other } = props;
//   return <IconButton {...other} />;
// })(({ theme, expand }) => ({
//   transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
//   marginLeft: 'auto',
//   transition: theme.transitions.create('transform', {
//     duration: theme.transitions.duration.shortest,
//   }),
// }));

export default function PostCard({ postData }) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const user = useSelector(getUser);

  const maxLength = 150;
  const description = expanded
    ? postData.description
    : postData.description.slice(0, maxLength);

  const fadeProps = useSpring({
    opacity: expanded ? 1 : 0.5,
  });

  return (
    <>
      <div className={classes.postContainer}>
        <div className={classes.postHeader}>
          <div className={classes.avatar}>
            <UserAvatar userData={postData.creatorId} />
          </div>

          <div className={classes.title}>
            <Link to={`posts/${postData._id}`}>{postData.title}</Link>
            <span>{getDateForm(postData.createdAt)}</span>
          </div>

          {user.auth && user.userData._id === postData.creatorId._id && (
            <div>
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            </div>
          )}
        </div>

        <div className={classes.postImage}>
          <img src={postData.image_url || NO_IMAGE_URL} />
        </div>

        <div className={classes.postDescription}>
          <animated.p
            style={{
              ...fadeProps,
              overflow: "hidden",
              height: expanded ? "auto" : "3rem",
            }}
            className={expanded ? classes.expanded : ""}
          >
            {description}
          </animated.p>
          {postData.description.length > maxLength && (
            <InButton onClick={handleExpandClick}>
              <span>{expanded ? "Show Less" : "Show more"}</span>
            </InButton>
          )}
        </div>

        <div className={classes.postActions}>
          {/* <InButton> */}
          <div>
            <span>Favorite</span>
            <FavoriteIcon />
          </div>
          {/* </InButton> */}

          {/* <InButton> */}
          <div>
            <span>Leave a comment</span>
            <CommentIcon />
          </div>
          {/* </InButton> */}
        </div>
      </div>
    </>
  );
}
