import React from "react";
import { BsPencilSquare } from "react-icons/bs";
import { RiDeleteBin2Line } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { useDeleteTagMutation } from "../../features/tag/tagApi";

const TagCard = ({ tag }) => {
  const [deleteTag, { isLoading }] = useDeleteTagMutation();
  const navigate = useNavigate();

  return (
    <section
      className="p-8 rounded-xl bg-no-repeat bg-center relative z-0 hover:-translate-y-1 hover:-translate-x-1 transition-all duration-200"
      style={{ backgroundImage: `url(${tag?.thumbnail?.url})` }}
    >
      <div className="absolute w-full h-full top-0 left-0 bg-black rounded-xl opacity-50 -z-10" />
      <div className="absolute top-4 right-4 flex flex-row gap-x-3">
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
