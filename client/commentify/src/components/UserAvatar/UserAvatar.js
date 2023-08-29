import React from "react";
import { useSelector } from "react-redux";
import { getUser } from "../../features/user/userSlice";
import { Avatar } from "@mui/material";

function UserAvatar({ userData }) {
  const user = useSelector(getUser);

  return userData.avatar_url ? (
    <Avatar src={user.userData.avatar_url} />
  ) : (
    <Avatar sx={{ bgcolor: "#fe6257;" }} aria-label="recipe">
      {userData.name.slice(0, 1)}
    </Avatar>
  );
}

export default UserAvatar;
