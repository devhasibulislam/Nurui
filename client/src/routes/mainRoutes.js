import Main from "../layout/main/Main";
import Home from "../page/main/Home";
import Membership from "../page/main/Membership";
import ViewPost from "../page/main/ViewPost";
import ViewTag from "../page/main/ViewTag";

const mainRoutes = {
  path: "/",
  element: <Main />,
  children: [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "membership",
      element: <Membership />,
    },
    {
      path: "post/:id",
      element: <ViewPost />,
    },
    {
      path: "tag/:id",
      element: <ViewTag />,
    },
  ],
};

export default mainRoutes;
