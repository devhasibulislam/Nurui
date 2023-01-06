import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import routes from "./routes/routes";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getMyself, toggleLoading } from "./features/auth/authSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      dispatch(getMyself(token));
    } else {
      dispatch(toggleLoading());
      console.log("Token not found!");
    }
  }, [dispatch]);

  return (
    <>
      <Toaster />
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
