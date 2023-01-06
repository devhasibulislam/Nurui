import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
import Loading from "../../../components/shared/Loading";
import Title from "../../../components/shared/Title";
import {
  useGetTagQuery,
  useUpdateTagMutation,
} from "../../../features/tag/tagApi";

const token = localStorage.getItem("accessToken");

const TagUpdate = () => {
  const { id } = useParams();
  const { data, isLoading: fetchingTag } = useGetTagQuery(id);
  const [tag, setTag] = useState({});
  const [updateTag, { isLoading, isSuccess, isError }] = useUpdateTagMutation();
  const [thumbnail, setThumbnail] = useState({});
  const [thumbnailLoading, setThumbnailLoading] = useState(false);

  useEffect(() => {
    setTag({
      _id: data?.data?._id,
      title: data?.data?.title,
      description: data?.data?.description,
    });
  }, [data?.data]);

  useEffect(() => {
    if (isLoading) {
      toast.loading("Updating tag", { id: "updateTag" });
    }
    if (isSuccess) {
      toast.success("Successfully update tag", { id: "updateTag" });
    }
    if (isError) {
      toast.error("An error occurred", { id: "updateTag" });
    }
  }, [isError, isLoading, isSuccess]);

  function handleTagUpdateForm(event) {
    event.preventDefault();
    const tagThumbnail =
      Object.keys(thumbnail).length === 0 ? data?.data?.thumbnail : thumbnail;

    const tagInfo = { ...tag, thumbnail: tagThumbnail };
    updateTag(tagInfo);
  }

  function handleUpdateTagThumbnail(event) {
    const formData = new FormData();
    formData.append("thumbnail", event.target.files[0]);

    const updateAvatar = async () => {
      setThumbnailLoading(true);
      const request = await fetch(
        `${process.env.REACT_APP_BASE_URL}tags/thumbnail?public_id=${data?.data?.thumbnail?.public_id}`,
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
      <Title>Update Tag - Dashboard</Title>
      {fetchingTag ? (
        <Loading />
      ) : (
        <form
          className="shadow-lg md:p-10 p-4 rounded-lg flex flex-wrap gap-y-6 max-w-3xl justify-between bg-white"
          onSubmit={handleTagUpdateForm}
        >
          {/* tag title */}
          <input
            className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
            type="text"
            name="title"
            value={tag?.title}
            onChange={(event) => setTag({ ...tag, title: event.target.value })}
            placeholder="Tag title"
          />

          {/* tag thumbnail */}
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

          {/* tag description */}
          <div className="flex flex-col w-full">
            <label className="mb-2 flex justify-between" htmlFor="description">
              Description
            </label>
            <textarea
              value={tag?.description}
              onChange={(event) =>
                setTag({ ...tag, description: event.target.value })
              }
              rows={3}
              name="description"
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
            Update tag
          </button>
        </form>
      )}
    </section>
  );
};

export default TagUpdate;
