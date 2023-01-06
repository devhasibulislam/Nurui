const Post = require("../models/Post");
const Tag = require("../models/Tag");
const User = require("../models/User");
const imageRemover = require("../utils/imageRemover.util");

const selectors = "_id name email avatar role status";

exports.postNewPost = async (data) => {
  const result = await Post.create(data);
  await User.findByIdAndUpdate(
    result.creator,
    {
      $push: {
        posts: result._id,
      },
    },
    {
      runValidators: false,
    }
  );
  result.tags.forEach(async (res) => {
    await Tag.findByIdAndUpdate(res, {
      $push: {
        posts: result._id,
      },
    });
  });
  return result;
};

exports.getAllPosts = async (query) => {
  const result = await Post.find(query)
    .populate([
      {
        path: "likes",
        select: selectors,
      },
      {
        path: "comments.creator",
        select: selectors,
      },
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
      {
        path: "watches",
        select: selectors,
      },
    ])
    .sort("-updatedAt");
  return result;
};

exports.getPost = async ({ id }) => {
  const result = await Post.findById(id).populate([
    {
      path: "likes",
      select: selectors,
    },
    {
      path: "comments.creator",
      select: selectors,
    },
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
    {
      path: "watches",
      select: selectors,
    },
  ]);
  return result;
};

exports.updatePost = async (id, data) => {
  let result;
  const post = await Post.findById(id);

  if (data?.likes || data?.watches) {
    if (data.watches) {
      if (!post.watches.includes(data.watches[0]))
        result = await Post.findByIdAndUpdate(
          id,
          {
            $push: {
              watches: data.watches[0],
            },
          },
          {
            runValidators: false,
          }
        );
    } else if (data.likes) {
      if (!post.likes.includes(data.likes[0]))
        result = await Post.findByIdAndUpdate(
          id,
          {
            $push: {
              likes: data.likes[0],
            },
          },
          {
            runValidators: false,
          }
        );
    }
  } else if (data?.comments) {
    result = await Post.findByIdAndUpdate(
      id,
      {
        $push: {
          comments: data?.comments[0],
        },
      },
      {
        runValidators: false,
      }
    );
  } else {
    result = await Post.findByIdAndUpdate(id, data, {
      runValidators: false,
    });
  }
  return result;
};

exports.deletePost = async ({ id }) => {
  const result = await Post.findByIdAndDelete(id);
  result.tags.forEach(async (res) => {
    await Tag.findByIdAndUpdate(res, {
      $pull: {
        posts: result._id,
      },
    });
  });
  await User.findByIdAndUpdate(result.creator, {
    $pull: {
      posts: result._id,
    },
  });
  await imageRemover(result?.thumbnail?.public_id);
  return result;
};

/**
 * Mongoose: deep population (populate a populated field)
 * https://stackoverflow.com/questions/18867628/mongoose-deep-population-populate-a-populated-field
 * Mongoose delete array element in document and save
 * https://stackoverflow.com/questions/14763721/mongoose-delete-array-element-in-document-and-save
 */