import Dashboard from "../layout/dashboard/Dashboard";
import MyProfile from "../page/dashboard/MyProfile";
import AddPost from "../page/dashboard/post/AddPost";
import PostList from "../page/dashboard/post/PostList";
import PostUpdate from "../page/dashboard/post/PostUpdate";
import AddTag from "../page/dashboard/tag/AddTag";
import TagList from "../page/dashboard/tag/TagList";
import TagUpdate from "../page/dashboard/tag/TagUpdate";
import PrivateRoute from "../utils/PrivateRoute";

const dashboardRoutes = {
  path: "/dashboard",
  element: (
    <PrivateRoute>
      <Dashboard />
    </PrivateRoute>
  ),
  children: [
    {
      path: "/dashboard",
      element: <MyProfile />,
    },
    {
      path: "add-tag",
      element: <AddTag />,
    },
    {
      path: "tag-list",
      element: <TagList />,
    },
    {
      path: "tag-list/:id",
      element: <TagUpdate />,
    },
    {
      path: "add-post",
      element: <AddPost />,
    },
    {
      path: "post-list",
      element: <PostList />,
    },
    {
      path: "post-list/:id",
      element: <PostUpdate />,
    },
  ],
};

export default dashboardRoutes;
