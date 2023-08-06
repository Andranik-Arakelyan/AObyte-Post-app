// import React, { useEffect, useState } from "react";
// import { Header, Login } from "../components";
// import { fetchPostDetails } from "../api/api";
// import { useParams } from "react-router-dom";
// import { PostDetail } from "../components";
// import { useSelector } from "react-redux";
// import { getLoginModalStatus } from "../features/loginModalSlice";

// function PostDetailPage(props) {
//   const { postId } = useParams();
//   const [loading, setLoading] = useState(true);
//   const [postInfo, setPostInfo] = useState(null);

//   const loginModal = useSelector(getLoginModalStatus);

//   useEffect(() => {
//     fetchPostDetails(postId)
//       .then((response) => {
//         setPostInfo(response.data);
//         setLoading(false);
//       })
//       .catch((error) => console.log(error));
//   }, [postId]);

//   return (
//     <>
//       <Header />
//       {loginModal && <Login />}
//       {!loading && (
//         <PostDetail
//           title={postInfo.title}
//           description={postInfo.description}
//           comments={postInfo.comments}
//           imageUrl={postInfo.imageUrl}
//           id={postInfo.id}
//         />
//       )}
//     </>
//   );
// }

// export default PostDetailPage;
