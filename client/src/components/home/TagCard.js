import React from "react";
import { BiUserPin } from "react-icons/bi";
import { BsFillSignpostFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const TagCard = ({ tag }) => {
  return (
    <section
      className="p-8 rounded-xl bg-no-repeat bg-center relative z-0 hover:-translate-y-1 hover:-translate-x-1 transition-all duration-200"
      style={{ backgroundImage: `url(${tag?.thumbnail?.url})` }}
    >
      <div className="absolute w-full h-full top-0 left-0 bg-black rounded-xl opacity-50 -z-10" />
      <div className="absolute top-4 right-4 flex flex-row gap-x-3">
        <div className="flex flex-wrap gap-x-2">
          <div
            style={{ paddingTop: "0.1em", paddingBottom: "0.1rem" }}
            className="text-xs px-3 rounded-full bg-yellow-200 text-yellow-800 w-fit flex items-center gap-1"
          >
            <BsFillSignpostFill />
            {tag?.posts?.length}
          </div>
          <div
            style={{ paddingTop: "0.1em", paddingBottom: "0.1rem" }}
            className="text-xs px-3 rounded-full bg-orange-200 text-orange-800 w-fit flex items-center gap-1"
          >
            <BiUserPin />
            {tag?.creator?.name}
          </div>
        </div>
      </div>
      <article className="z-10 text-white flex flex-col gap-y-4">
        <h2 className="text-2xl font-medium text-ellipsis overflow-hidden whitespace-nowrap">
          <Link to={`/tag/${tag?._id}`}>{tag?.title}</Link>
        </h2>
        <p className="text-sm text-ellipsis overflow-hidden whitespace-nowrap">
          {tag?.description}
        </p>
      </article>
    </section>
  );
};

export default TagCard;
