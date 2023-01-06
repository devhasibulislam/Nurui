import React from "react";
import PostCard from "../../../components/dashboard/PostCard";
import Loading from "../../../components/shared/Loading";
import { useGetAllPostsQuery } from "../../../features/post/postApi";

const PostList = () => {
  const { data, isLoading } = useGetAllPostsQuery();

  return isLoading ? (
    <Loading />
  ) : (
    <section className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
      {data?.data?.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </section>
  );
};

export default PostList;
