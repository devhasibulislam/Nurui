import React from "react";
import { Link } from "react-router-dom";
import { BiUserPin } from "react-icons/bi";
import { SlLike } from "react-icons/sl";

const BlogCard = ({ post }) => {
  return (
    <section
      className="lg:p-12 md:p-8 p-4 rounded-xl bg-no-repeat bg-center relative z-0 hover:-translate-y-1 hover:-translate-x-1 transition-all duration-200"
      style={{ backgroundImage: `url(${post?.thumbnail?.url})` }}
    >
      {/* overlay */}
      <div className="absolute w-full h-full top-0 left-0 bg-black rounded-xl opacity-50 -z-10" />
      {/* author */}
      <div className="flex flex-row gap-x-3 mb-4">
        <div
          style={{ paddingTop: "0.1em", paddingBottom: "0.1rem" }}
          className="text-xs px-3 rounded-full bg-purple-200 text-purple-800 md:flex md:items-center gap-x-1 hidden"
        >
          <BiUserPin />
          {post?.creator?.name}
        </div>
      </div>
      {/* credentials */}
      <article className="z-10 text-white flex flex-col gap-y-2">
        {/* title */}
        <h2 className="text-2xl font-medium text-ellipsis overflow-hidden whitespace-nowrap">
          <Link to={`/post/${post?._id}`}>{post?.title}</Link>
        </h2>
        {/* description */}
        <p className="text-sm text-ellipsis overflow-hidden whitespace-nowrap">
          {post?.description}
        </p>
      </article>
      {/* tags */}
      <div className="flex flex-row flex-wrap gap-2 mt-4">
        {post?.tags?.map((tag, index) => (
          <div
            style={{ paddingTop: "0.1em", paddingBottom: "0.1rem" }}
            className={`text-xs px-3 rounded-full ${
              index % 2 === 0
                ? "bg-red-200 text-red-800"
                : "bg-indigo-200 text-indigo-800"
            }`}
          >
            {tag?.title}
          </div>
        ))}
      </div>
      {/* read time */}
      <div className="bottom-4 right-4 flex flex-row justify-end gap-x-3">
        <div
          style={{ paddingTop: "0.1em", paddingBottom: "0.1rem" }}
          className="text-xs px-3 rounded-full bg-indigo-200 text-indigo-800 flex items-center gap-x-1"
        >
          <SlLike />
          {post?.likes?.length}
        </div>
        <div
          style={{ paddingTop: "0.1em", paddingBottom: "0.1rem" }}
          className="text-xs px-3 rounded bg-slate-200 text-slate-800"
        >
          Read {post?.readTime} min
        </div>
      </div>
    </section>
  );
};

export default BlogCard;
