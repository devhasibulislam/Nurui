import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../components/shared/Loading";
import { useSelector } from "react-redux";
import Footer from "../../components/shared/Footer";
import {
  useGetTagQuery,
  useUpdateTagMutation,
} from "../../features/tag/tagApi";
import BlogCard from "../../components/home/BlogCard";

const ViewTag = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetTagQuery(id);
  const [updateTagCredentials] = useUpdateTagMutation();
  const tag = data?.data || {};
  const { userCredentials, isLoading: isFetching } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (!isFetching)
      updateTagCredentials({ _id: id, watches: [userCredentials?._id] });
  }, [id, isFetching, updateTagCredentials, userCredentials]);

  console.log(tag?.posts);

  return isLoading ? (
    <Loading />
  ) : (
    <section className="max-w-7xl mx-auto lg:px-0 px-4">
      <div className="grid lg:grid-cols-2 lg:gap-x-12 md:grid-cols-2 md:gap-x-10 grid-cols-1 lg:h-[650px] md:h-[500px] h-[450px]">
        <div
          className="bg-no-repeat bg-center bg-cover lg:rounded-xl md:rounded-xl lg:h-auto md:h-auto h-[350px]"
          style={{ backgroundImage: `url(${tag?.thumbnail?.url})` }}
        />
        <article className="flex flex-col lg:gap-y-4 md:gap-y-4 gap-y-3 lg:h-auto md:h-auto h-full my-auto">
          <h1 className="lg:text-6xl md:text-3xl text-xl font-bold text-black lg:leading-[4rem] md:leading-[4rem]">
            {tag?.title}
          </h1>
          <p className="text-slate-600">
            By{" "}
            <span className="font-medium text-slate-700">
              {tag?.creator?.name}
            </span>{" "}
            @ {tag?.createdAt?.split("T")[0]}
          </p>
        </article>
      </div>
      <article className="max-w-4xl mx-auto p-12 bg-white shadow rounded-xl relative lg:-mt-20 md:-mt-20 -mt-4 mb-8">
        <p className="text-lg leading-8 text-justify first-letter:text-3xl">
          {tag?.description}
        </p>
      </article>
      <div className="my-12" />
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8">
        {tag?.posts?.map((post, index) => (
          <BlogCard key={index} post={post} />
        ))}
      </div>
      <div className="my-12" />
      <Footer />
    </section>
  );
};

export default ViewTag;

/**
 * In reactJS, how to copy text to clipboard?
 * https://stackoverflow.com/questions/39501289/in-reactjs-how-to-copy-text-to-clipboard
 * How To Get The Current URL In React?
 * https://timmousk.com/blog/react-get-current-url/
 */
