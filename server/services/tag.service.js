const Tag = require("../models/Tag");
const User = require("../models/User");
const imageRemover = require("../utils/imageRemover.util");

const selectors = "_id name email avatar role status";

exports.postNewTag = async (data) => {
  const result = await Tag.create(data);
  await User.findByIdAndUpdate(
    result.creator,
    {
      $push: {
        tags: result._id,
      },
    },
    {
      runValidators: false,
    }
  );
  return result;
};

exports.getAllTags = async (query) => {
  const result = await Tag.find(query)
    .populate([
      {
        path: "creator",
        select: selectors,
      },
      {
        path: "posts",
        select:
          "_id thumbnail globalTag tags likes creator watches comments description title readTime",
        populate: [
          {
            path: "creator",
            select: selectors,
          },
          {
            path: "tags",
            select: "_id title thumbnail",
            populate: {
              path: "creator",
              select: selectors,
            },
          },
        ],
      },
    ])
    .sort("-updatedAt");
  return result;
};

exports.getTag = async ({ id }) => {
  const result = await Tag.findById(id).populate([
    {
      path: "creator",
      select: selectors,
    },
    {
      path: "posts",
      select:
        "_id thumbnail globalTag tags likes creator watches comments description title readTime",
      populate: [
        {
          path: "creator",
          select: selectors,
        },
        {
          path: "tags",
          select: "_id title thumbnail",
          populate: {
            path: "creator",
            select: selectors,
          },
        },
      ],
    },
  ]);
  return result;
};

exports.updateTag = async (id, data) => {
  const result = await Tag.findByIdAndUpdate(id, data, {
    runValidators: false,
  });
  return result;
};

exports.deleteTag = async ({ id }) => {
  const result = await Tag.findByIdAndDelete(id);
  await User.findByIdAndUpdate(result.creator, {
    $pull: {
      tags: result._id,
    },
  });
  await imageRemover(result?.thumbnail?.public_id);
  return result;
};
