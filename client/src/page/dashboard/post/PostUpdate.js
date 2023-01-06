import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
import Loading from "../../../components/shared/Loading";
import Title from "../../../components/shared/Title";
import {
  useGetPostQuery,
  useUpdatePostMutation,
} from "../../../features/post/postApi";

const token = localStorage.getItem("accessToken");

const PostUpdate = () => {
  const { id } = useParams();
  const { data, isLoading: fetchingPost } = useGetPostQuery(id);
  const [post, setPost] = useState({});
  const [updatePost, { isLoading, isSuccess, isError }] =
    useUpdatePostMutation();
  const [thumbnail, setThumbnail] = useState({});
  const [thumbnailLoading, setThumbnailLoading] = useState(false);

  useEffect(() => {
    setPost({
      _id: data?.data?._id,
      title: data?.data?.title,
      description: data?.data?.description,
      globalTag: data?.data?.globalTag,
    });
  }, [data?.data]);

  useEffect(() => {
    if (isLoading) {
      toast.loading("Updating post", { id: "updatePost" });
    }
    if (isSuccess) {
      toast.success("Successfully update post", { id: "updatePost" });
    }
    if (isError) {
      toast.error("An error occurred", { id: "updatePost" });
    }
  }, [isError, isLoading, isSuccess]);

  function handlePostUpdateForm(event) {
    event.preventDefault();
    const postThumbnail =
      Object.keys(thumbnail).length === 0 ? data?.data?.thumbnail : thumbnail;

    const postInfo = { ...post, thumbnail: postThumbnail };
    updatePost(postInfo);
  }

  function handleUpdateTagThumbnail(event) {
    const formData = new FormData();
    formData.append("thumbnail", event.target.files[0]);

    const updateAvatar = async () => {
      setThumbnailLoading(true);
      const request = await fetch(
        `${process.env.REACT_APP_BASE_URL}post/thumbnail?public_id=${data?.data?.thumbnail?.public_id}`,
        {
          method: "PATCH",
          headers: {
            authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );
      const response = await request.json();
      if (response.acknowledgement) {
        setThumbnailLoading(false);
        setThumbnail({
          url: response.data.path,
          public_id: response.data.filename,
        });
        console.log(response.description);
      } else {
        setThumbnailLoading(false);
        console.log(response.description);
      }
    };
    updateAvatar();
  }

  return (
    <section className="flex justify-center items-center h-full w-full">
      <Title>Update Post - Dashboard</Title>
      {fetchingPost ? (
        <Loading />
      ) : (
        <form
          className="shadow-lg md:p-10 p-4 rounded-lg flex flex-wrap gap-y-6 max-w-3xl justify-between bg-white"
          onSubmit={handlePostUpdateForm}
        >
          {/* post title */}
          <input
            className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
            type="text"
            name="title"
            value={post?.title}
            onChange={(event) =>
              setPost({ ...post, title: event.target.value })
            }
            placeholder="Tag title"
          />

          {/* post thumbnail */}
          {thumbnailLoading ? (
            "Uploading..."
          ) : Object.keys(thumbnail).length === 0 ? (
            <div className="flex lg:flex-row md:flex-row flex-col items-center justify-center lg:gap-x-4 md:gap-x-4 gap-y-4 w-full">
              <img
                src={data?.data?.thumbnail?.url}
                alt={data?.data?.thumbnail?.public_id}
                loading="lazy"
                className="h-12 w-12 object-cover object-center rounded-full cursor-not-allowed shadow"
              />
              <input
                class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none p-3"
                id="file_input"
                name="thumbnail"
                type="file"
                onChange={handleUpdateTagThumbnail}
              />
            </div>
          ) : (
            "Thumbnail updated!"
          )}

          {/* post description */}
          <div className="flex flex-col w-full">
            <label className="mb-2 flex justify-between" htmlFor="description">
              Description
            </label>
            <textarea
              value={post?.description}
              onChange={(event) =>
                setPost({ ...post, description: event.target.value })
              }
              rows={3}
              name="description"
              id="description"
              className="bg-gray-50 rounded-xl"
              placeholder="Write brief tag description"
            />
          </div>

          <div className="w-full">
            <select
              id="globalTag"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              onChange={(event) =>
                setPost({ ...post, globalTag: event.target.value })
              }
            >
              <option
                value="featured"
                selected={post?.globalTag === "featured"}
              >
                Featured
              </option>
              <option
                value="preemptive"
                selected={post?.globalTag === "preemptive"}
              >
                Preemptive
              </option>
              <option value="none" selected={post?.globalTag === "none"}>
                None
              </option>
              <option
                value="weekly-best"
                selected={post?.globalTag === "weekly-best"}
              >
                Weekly Best
              </option>
            </select>
          </div>

          {/* submit button */}
          <button
            type="submit"
            className="font-bold text-white py-3 rounded-lg bg-primary w-full disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Update post
          </button>
        </form>
      )}
    </section>
  );
};

export default PostUpdate;
