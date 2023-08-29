import { RouterProvider, createBrowserRouter } from "react-router-dom";

import {
  HOME_PAGE,
  SIGN_UP,
  ADD_POST,
  VERIFICATION,
  PROFILE_PAGE,
  MY_POSTS_PAGE,
  LOGIN_PAGE,
} from "./constants/path";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import AddPostPage from "./pages/AddPostPage";

import "./App.css";
import { checkUser, getUser } from "./features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import VerificationPage from "./pages/VerificationPage";
import { useEffect } from "react";
import ProfilePage from "./pages/ProfilePage";
import MyPostsPage from "./pages/MyPostsPage";
import LoginPage from "./pages/LoginPage";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUser());
  }, [dispatch]);

  const user = useSelector(getUser);

  const router = createBrowserRouter([
    {
      path: HOME_PAGE,
      element: <HomePage />,
    },
    {
      path: SIGN_UP,
      element: <SignUpPage />,
    },
    {
      path: LOGIN_PAGE,
      element: <LoginPage />,
    },
    {
      path: VERIFICATION,
      element: user.auth ? <HomePage /> : <VerificationPage />,
    },
    // {
    //   path: PAGE_DETAIL,
    //   element: <PostDetailPage />,
    //   action: authAction,
    // },
    {
      path: ADD_POST,
      element: <AddPostPage />,
    },
    {
      path: PROFILE_PAGE,
      element: <ProfilePage />,
    },
    {
      path: MY_POSTS_PAGE,
      element: <MyPostsPage />,
    },
  ]);
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
