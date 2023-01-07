import React from "react";
import BlogCard from "../../components/home/BlogCard";
import BlogCarousel from "../../components/home/BlogCarousel";
import TagCard from "../../components/home/TagCard";
import Footer from "../../components/shared/Footer";
import Loading from "../../components/shared/Loading";
import { useGetAllPostsQuery } from "../../features/post/postApi";
import { useGetAllTagsQuery } from "../../features/tag/tagApi";

const Home = () => {
  const { data, isLoading } = useGetAllPostsQuery();
  const { data: tickets, isLoading: isFetching } = useGetAllTagsQuery();
  const posts = data?.data || {};
  const tags = tickets?.data || {};

  return (
    <>
      {isLoading || isFetching ? (
        <Loading />
      ) : (
        <>
          <div className="-z-0">
            <BlogCarousel posts={posts} />
          </div>
          <div className="flex flex-col gap-y-8">
            <div className="max-w-7xl mx-auto grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 lg:px-0 px-8 relative lg:-mt-20 md:-mt-20 -mt-8 z-10 mb-20">
              {posts?.map((post) => (
                <BlogCard key={post?._id} post={post} />
              ))}
            </div>
            <div className="max-w-7xl mx-auto grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 lg:px-0 px-8 relative lg:-mt-20 md:-mt-20 -mt-8 z-10 mb-20">
              {tags?.map((tag) => (
                <TagCard key={tag?._id} tag={tag} />
              ))}
            </div>
          </div>
          <div className="container mx-auto">
            <Footer />
          </div>
        </>
      )}
    </>
  );
};

export default Home;
