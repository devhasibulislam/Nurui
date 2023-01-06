import React from "react";
import { useSelector } from "react-redux";
import Loading from "../components/shared/Loading";
import NotFound from "../page/main/NotFound";

const AdminRoute = ({ children }) => {
  const {
    user: { email, role },
    isLoading,
  } = useSelector((state) => state.auth);

  if (isLoading) {
    return <Loading />;
  }

  if (!isLoading && email && role !== "admin") {
    return <NotFound />;
  }

  return children;
};

export default AdminRoute;
