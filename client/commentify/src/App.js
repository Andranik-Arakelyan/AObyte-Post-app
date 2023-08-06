import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { HOME_PAGE, PAGE_DETAIL, SIGN_UP, ADD_POST } from "./constants/path";
import HomePage from "./pages/HomePage";
import SignUpPage, { action as authAction } from "./pages/SignUpPage";
// import PostDetailPage from "./pages/PostDetailPage";
import AddPostPage from "./pages/AddPostPage";

import "./App.css";

function App() {
  const router = createBrowserRouter([
    {
      path: HOME_PAGE,
      element: <HomePage />,
    },
    {
      path: SIGN_UP,
      element: <SignUpPage />,
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
  ]);
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
