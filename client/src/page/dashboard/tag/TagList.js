import React from "react";
import { useSelector } from "react-redux";
import TagCard from "../../../components/dashboard/TagCard";
import Loading from "../../../components/shared/Loading";

const TagList = () => {
  const { userCredentials, isLoading } = useSelector((state) => state.auth);

  return isLoading ? (
    <Loading />
  ) : (
    <section className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
      {userCredentials?.tags?.map((tag) => (
        <TagCard key={tag._id} tag={tag} />
      ))}
    </section>
  );
};

export default TagList;
