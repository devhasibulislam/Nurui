import React from "react";
import TagCard from "../../../components/dashboard/TagCard";
import Loading from "../../../components/shared/Loading";
import { useGetAllTagsQuery } from "../../../features/tag/tagApi";

const TagList = () => {
  const { data, isLoading } = useGetAllTagsQuery();

  return isLoading ? (
    <Loading />
  ) : (
    <section className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
      {data?.data?.map((tag) => (
        <TagCard key={tag._id} tag={tag} />
      ))}
    </section>
  );
};

export default TagList;
