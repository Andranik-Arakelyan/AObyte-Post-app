import React from "react";

import { Avatar } from "@mui/material";

function UserAvatar({ userData }) {
  return userData.avatar_url ? (
    <Avatar src={userData.avatar_url} />
  ) : (
    <Avatar sx={{ bgcolor: "#fe6257;" }} aria-label="recipe">
      {userData.name.slice(0, 1)}
    </Avatar>
  );
}

export default UserAvatar;
