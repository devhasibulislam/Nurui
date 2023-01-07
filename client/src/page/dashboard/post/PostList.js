import React from "react";
import { useSelector } from "react-redux";
import PostCard from "../../../components/dashboard/PostCard";
import Loading from "../../../components/shared/Loading";

const PostList = () => {
  const { userCredentials, isLoading } = useSelector((state) => state.auth);

  return isLoading ? (
    <Loading />
  ) : (
    <section className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
      {userCredentials?.posts?.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </section>
  );
};

export default PostList;
