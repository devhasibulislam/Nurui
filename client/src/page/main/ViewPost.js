import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  useGetPostQuery,
  useUpdatePostMutation,
} from "../../features/post/postApi";
import Loading from "../../components/shared/Loading";
import { SlLike } from "react-icons/sl";
import {
  AiOutlineEye,
  AiOutlineSend,
  AiOutlineComment,
  AiOutlineLink,
} from "react-icons/ai";
import { useSelector } from "react-redux";
import { useForm, useWatch } from "react-hook-form";
import Footer from "../../components/shared/Footer";

const ViewPost = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetPostQuery(id);
  const [updatePostCredentials] = useUpdatePostMutation();
  const post = data?.data || {};
  const {
    userCredentials,
    user: { role },
    isLoading: isFetching,
  } = useSelector((state) => state.auth);
  const { handleSubmit, register, reset, control } = useForm();
  const comment = useWatch({ control, name: "comment" });

  useEffect(() => {
    if (!isFetching)
      updatePostCredentials({ _id: id, watches: [userCredentials?._id] });
  }, [id, isFetching, updatePostCredentials, userCredentials]);

  function onSubmit(data) {
    updatePostCredentials({
      _id: id,
      comments: [{ creator: userCredentials?._id, comment: data?.comment }],
    });
    reset();
  }

  return isLoading ? (
    <Loading />
  ) : (
    <section className="max-w-7xl mx-auto lg:px-0 px-4">
      <div className="grid lg:grid-cols-2 lg:gap-x-12 md:grid-cols-2 md:gap-x-10 grid-cols-1 lg:h-[650px] md:h-[500px] h-[450px]">
        <div
          className="bg-no-repeat bg-center bg-cover lg:rounded-xl md:rounded-xl lg:h-auto md:h-auto h-[300px]"
          style={{ backgroundImage: `url(${post?.thumbnail?.url})` }}
        />
        <article className="flex flex-col lg:gap-y-4 md:gap-y-4 gap-y-3 lg:h-auto md:h-auto h-full my-auto">
          <div className="flex gap-x-2">
            <div
              style={{ paddingTop: "0.1em", paddingBottom: "0.1rem" }}
              className="text-xs px-3 rounded-full bg-indigo-200 text-indigo-800 w-fit flex items-center gap-1"
            >
              <AiOutlineEye />
              {post?.watches?.length}
            </div>
            <div
              style={{ paddingTop: "0.1em", paddingBottom: "0.1rem" }}
              className="text-xs px-3 rounded-full bg-orange-200 text-orange-800 w-fit flex items-center gap-1"
            >
              <AiOutlineComment />
              {post?.comments?.length}
            </div>
            <div
              style={{ paddingTop: "0.1em", paddingBottom: "0.1rem" }}
              className="text-xs px-3 rounded-full bg-purple-200 text-purple-800 w-fit"
            >
              {post?.globalTag}
            </div>
          </div>
          <h1 className="lg:text-6xl md:text-3xl font-bold text-black lg:leading-[4rem] md:leading-[4rem]">
            {post?.title}
          </h1>
          <p className="text-slate-600">
            By{" "}
            <span className="font-medium text-slate-700">
              {post?.creator?.name}
            </span>{" "}
            @ {post?.createdAt?.split("T")[0]}
          </p>
        </article>
      </div>
      <article className="max-w-4xl mx-auto lg:p-12 md:p-10 p-4 bg-white shadow rounded-xl relative lg:-mt-20 md:-mt-20 -mt-4 mb-8">
        <div className="flex items-center justify-between">
          <p className="flex flex-row justify-end items-center gap-x-4 order-2">
            <button
              className="btn-secondary"
              onClick={() =>
                updatePostCredentials({
                  _id: post?._id,
                  likes: [userCredentials?._id],
                })
              }
            >
              <SlLike />
            </button>
            <span className="text-xl font-medium">{post?.likes?.length}</span>
          </p>
          <button
            className="btn order-1"
            onClick={async () =>
              await navigator.clipboard.writeText(window?.location?.href)
            }
          >
            <AiOutlineLink />
          </button>
        </div>
        <hr className="my-4" />
        <p className="text-lg leading-8 text-justify first-letter:text-3xl">
          {post?.description}
        </p>
      </article>
      {role && (
        <div className="max-w-4xl mx-auto my-4">
          <form className="flex" onSubmit={handleSubmit(onSubmit)}>
            {/* tag description */}
            <div className="flex flex-col justify-center w-full">
              <label
                className="mb-2 flex justify-between"
                htmlFor="description"
              >
                Comment <span>{comment?.length}/500</span>
              </label>
              <div className="w-full flex items-center justify-between gap-x-4">
                <textarea
                  rows={2}
                  {...register("comment", {
                    required: true,
                    minLength: 5,
                    maxLength: 500,
                  })}
                  id="comment"
                  className="bg-gray-50 rounded-xl w-full"
                  placeholder="Write your comment"
                />
                <button type="submit" className="btn">
                  <AiOutlineSend />
                </button>
              </div>
            </div>
          </form>
          <div className="my-4 flex flex-col gap-y-4">
            {post?.comments?.map(({ _id, creator, comment }, index) => (
              <div
                key={_id}
                className={`flex items-center gap-x-2 ${
                  index % 2 === 0 ? "mr-auto" : "ml-auto"
                }`}
              >
                <img
                  src={creator?.avatar?.url}
                  alt={creator?.avatar?.public_id}
                  loading="lazy"
                  className={`w-10 h-10 object-cover object-center rounded-full ${
                    index % 2 === 0 ? "order-1" : "order-2"
                  }`}
                />
                <p
                  className={`bg-slate-100 px-2 py-3 w-fit ${
                    index % 2 === 0
                      ? "rounded-t-xl rounded-br-xl order-2"
                      : "rounded-t-xl rounded-bl-xl order-1"
                  } shadow`}
                >
                  {comment}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="my-12" />
      <Footer />
    </section>
  );
};

export default ViewPost;

/**
 * In reactJS, how to copy text to clipboard?
 * https://stackoverflow.com/questions/39501289/in-reactjs-how-to-copy-text-to-clipboard
 * How To Get The Current URL In React?
 * https://timmousk.com/blog/react-get-current-url/
 */
