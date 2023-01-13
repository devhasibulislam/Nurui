import React, { useEffect, useState } from "react";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import Title from "../../../components/shared/Title";
import { useInsertNewPostMutation } from "../../../features/post/postApi";
import { FiTrash } from "react-icons/fi";
import { useGetAllTagsQuery } from "../../../features/tag/tagApi";

const token = localStorage.getItem("accessToken");

const AddPost = () => {
  const { handleSubmit, register, reset, control } = useForm();
  const description = useWatch({ control, name: "description" });
  const title = useWatch({ control, name: "title" });
  const [thumbnail, setThumbnail] = useState({});
  const [thumbnailLoading, setThumbnailLoading] = useState(false);
  const [addNewPost, { isLoading, isSuccess, isError }] =
    useInsertNewPostMutation();
  const { data } = useGetAllTagsQuery();
  const postTags = data?.data || {};
  const {
    userCredentials: { _id },
  } = useSelector((state) => state.auth);

  const {
    fields: tagFields,
    append: tagAppend,
    remove: tagRemove,
  } = useFieldArray({ control, name: "tags" });

  useEffect(() => {
    if (isLoading) {
      toast.loading("Posting tag", { id: "addNewPost" });
    }
    if (isSuccess) {
      toast.success("Successfully post tag", { id: "addNewPost" });
    }
    if (isError) {
      toast.error("An error occurred", { id: "addNewPost" });
    }
  }, [isError, isLoading, isSuccess]);

  function onSubmit(data) {
    const tags = postTags.map(
      (tag) => data?.tags?.includes(tag?.title) && tag._id
    );
    const tagIds = tags?.filter((tag) => tag);
    addNewPost({
      title: data.title,
      description: data.description,
      thumbnail,
      creator: _id,
      tags: tagIds,
      readTime: Number(Math.ceil(description.length / 1500)),
    });
    reset();
  }

  function handlePostThumbnail(event) {
    const formData = new FormData();
    formData.append("thumbnail", event.target.files[0]);

    const uploadThumbnail = async () => {
      setThumbnailLoading(true);
      const request = await fetch(
        `${process.env.REACT_APP_BASE_URL}post/thumbnail`,
        {
          method: "POST",
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
        console.log(response.description);
      }
    };
    uploadThumbnail();
  }

  return (
    <section className="flex justify-center items-center h-full w-full">
      <Title>Add Tag - Dashboard</Title>
      <form
        className="shadow-lg md:p-10 p-4 rounded-lg flex flex-wrap gap-y-6 max-w-3xl justify-between bg-white"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* tag title */}
        <div className="flex flex-col w-full">
          <label className="mb-2 flex justify-between" htmlFor="title">
            Title <span>{title?.length}/100</span>
          </label>
          <input
            className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
            type="text"
            name="title"
            placeholder="Post title"
            {...register("title", {
              required: true,
              minLength: 10,
              maxLength: 100,
            })}
          />
        </div>

        {/* tag thumbnail */}
        {thumbnailLoading ? (
          "Uploading..."
        ) : Object.keys(thumbnail).length === 0 ? (
          <div className="flex items-center justify-center w-full">
            <input
              class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none p-3"
              id="file_input"
              name="thumbnail"
              type="file"
              required
              onChange={handlePostThumbnail}
            />
          </div>
        ) : (
          "Thumbnail uploaded!"
        )}

        {/* post description */}
        <div className="flex flex-col w-full">
          <label className="mb-2 flex justify-between" htmlFor="description">
            Description <span>{description?.length}/5000</span>
          </label>
          <textarea
            rows={3}
            {...register("description", {
              required: true,
              minLength: 100,
              maxLength: 5000,
            })}
            id="description"
            className="bg-gray-50 rounded-xl"
            placeholder="Write brief tag description"
          />
        </div>

        {/* post tags */}
        <div className="flex flex-col w-full">
          <label className="mb-2">Tags</label>
          <div>
            <div>
              {tagFields.map((item, index) => {
                return (
                  <div key={item.key} className="flex gap-3 mb-5">
                    <div className="!w-full">
                      <input
                        className="!w-full rounded-xl"
                        type="text"
                        {...register(`tags[${index}]`, { required: true })}
                      />
                      <div className="flex flex-row flex-wrap gap-4 w-full mt-4 h-32 overflow-y-scroll bg-gray-50 p-2 rounded-lg shadow">
                        {postTags?.map((tag) => (
                          <p
                            key={tag._id}
                            className="flex flex-row items-center gap-x-2 hover:shadow transition-all duration-200 rounded-lg px-1 py-2"
                          >
                            <img
                              src={tag?.thumbnail?.url}
                              alt={tag?.thumbnail?.public_id}
                              loading="lazy"
                              className="object-cover object-center h-8 w-8 rounded-full"
                            />
                            <span>{tag?.title}</span>
                          </p>
                        ))}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => tagRemove(index)}
                      className="grid place-items-center rounded-xl flex-shrink-0 bg-red-500/20 border border-red-500 h-11 w-11 group transition-all hover:bg-red-500"
                    >
                      <FiTrash
                        className="text-red-500 group-hover:text-white transition-all"
                        size="20"
                      />
                    </button>
                  </div>
                );
              })}
            </div>
            <div>
              <button
                type="button"
                onClick={() => tagAppend("")}
                className="btn"
              >
                Add Tag
              </button>
            </div>
          </div>
        </div>

        {/* submit button */}
        <button
          type="submit"
          className="font-bold text-white py-3 rounded-lg bg-primary w-full disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Add new post
        </button>
      </form>
    </section>
  );
};

export default AddPost;
