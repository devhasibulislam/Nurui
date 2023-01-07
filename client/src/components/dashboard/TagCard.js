import React from "react";
import { BsPencilSquare } from "react-icons/bs";
import { RiDeleteBin2Line } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { useDeleteTagMutation } from "../../features/tag/tagApi";
import { BiUserPin } from "react-icons/bi";
import { BsFillSignpostFill } from "react-icons/bs";

const TagCard = ({ tag }) => {
  const [deleteTag, { isLoading }] = useDeleteTagMutation();
  const navigate = useNavigate();

  return (
    <section
      className="p-8 rounded-xl bg-no-repeat bg-center relative z-0 hover:-translate-y-1 hover:-translate-x-1 transition-all duration-200"
      style={{ backgroundImage: `url(${tag?.thumbnail?.url})` }}
    >
      {/* overlay */}
      <div className="absolute w-full h-full top-0 left-0 bg-black rounded-xl opacity-50 -z-10" />
      {/* actions */}
      <div className="top-4 right-4 flex flex-row justify-end gap-x-3">
        {isLoading ? (
          <span className="text-white">Loading...</span>
        ) : (
          <>
            <BsPencilSquare
              onClick={() => navigate(`/dashboard/tag-list/${tag?._id}`)}
              className="text-black text-3xl bg-white hover:bg-green-500 hover:text-white transition-all delay-200 rounded-lg p-1 cursor-pointer"
            />
            <RiDeleteBin2Line
              onClick={() => deleteTag(tag?._id)}
              className="text-black text-3xl bg-white hover:bg-red-500 hover:text-white transition-all delay-200 rounded-lg p-1 cursor-pointer"
            />
          </>
        )}
      </div>
      {/* credentials */}
      <article className="z-10 text-white flex flex-col gap-y-2">
        <h2 className="text-2xl font-medium text-ellipsis overflow-hidden whitespace-nowrap">
          <Link to={`/tag/${tag?._id}`}>{tag?.title}</Link>
        </h2>
        <p className="text-sm text-ellipsis overflow-hidden whitespace-nowrap">
          {tag?.description}
        </p>
      </article>
      {/* post & author */}
      <div className="top-4 right-4 flex flex-row flex-wrap justify-end gap-3 mt-4">
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
    </section>
  );
};

export default TagCard;
