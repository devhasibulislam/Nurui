import React, { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import Title from "../../../components/shared/Title";
import { useInsertNewTagMutation } from "../../../features/tag/tagApi";

const token = localStorage.getItem("accessToken");

const AddTag = () => {
  const { handleSubmit, register, reset, control } = useForm();
  const description = useWatch({ control, name: "description" });
  const [thumbnail, setThumbnail] = useState({});
  const [thumbnailLoading, setThumbnailLoading] = useState(false);
  const [addNewTag, { isLoading, isSuccess, isError }] =
    useInsertNewTagMutation();
  const {
    userCredentials: { _id },
  } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isLoading) {
      toast.loading("Posting tag", { id: "addNewTag" });
    }
    if (isSuccess) {
      toast.success("Successfully post tag", { id: "addNewTag" });
    }
    if (isError) {
      toast.error("An error occurred", { id: "addNewTag" });
    }
  }, [isError, isLoading, isSuccess]);

  function onSubmit(data) {
    addNewTag({ ...data, thumbnail, creator: _id });
    reset();
  }

  function handleTagThumbnail(event) {
    const formData = new FormData();
    formData.append("thumbnail", event.target.files[0]);

    const uploadThumbnail = async () => {
      setThumbnailLoading(true);
      const request = await fetch(
        `${process.env.REACT_APP_BASE_URL}tags/thumbnail`,
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
        <input
          className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
          type="text"
          name="title"
          placeholder="Tag title"
          {...register("title", {
            required: true,
            minLength: 3,
            maxLength: 50,
          })}
        />

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
              onChange={handleTagThumbnail}
            />
          </div>
        ) : (
          "Thumbnail uploaded!"
        )}

        {/* tag description */}
        <div className="flex flex-col w-full">
          <label className="mb-2 flex justify-between" htmlFor="description">
            Description <span>{description?.length}/250</span>
          </label>
          <textarea
            rows={3}
            {...register("description", {
              required: true,
              minLength: 10,
              maxLength: 250,
            })}
            id="description"
            className="bg-gray-50 rounded-xl"
            placeholder="Write brief tag description"
          />
        </div>

        {/* submit button */}
        <button
          type="submit"
          className="font-bold text-white py-3 rounded-lg bg-primary w-full disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Add new tag
        </button>
      </form>
    </section>
  );
};

export default AddTag;
