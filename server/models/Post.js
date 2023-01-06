/* external imports */
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const validator = require("validator");

const postSchema = new mongoose.Schema(
  {
    // for post likes
    likes: [
      {
        type: ObjectId,
        ref: "User",
      },
    ],

    // for post comments
    comments: [
      {
        creator: {
          type: ObjectId,
          ref: "User",
        },

        comment: {
          type: String,
          required: [true, "Please, provide a post comment"],
          trim: true,
          minLength: [5, "Post comment must be at least 5 characters"],
          maxLength: [500, "Post comment would be at most 500 characters"],
        },
      },
    ],

    // for post watches
    watches: [
      {
        type: ObjectId,
        ref: "User",
      },
    ],

    // for post of creator
    creator: {
      type: ObjectId,
      ref: "User",
    },

    // for post tag
    tags: [
      {
        type: ObjectId,
        ref: "Tag",
      },
    ],

    // for post title
    title: {
      type: String,
      required: [true, "Please, provide post title"],
      trim: true,
      unique: [true, "Already exist, try new"],
      minLength: [10, "Post title must be at least 10 characters"],
      maxLength: [100, "Post title would be at most 100 characters"],
    },

    // for post description
    description: {
      type: String,
      required: [true, "Please, provide post description"],
      trim: true,
      minLength: [100, "Post description must be at least 100 characters"],
      maxLength: [5000, "Post description would be at most 5000 characters"],
    },

    // for tag thumbnail
    thumbnail: {
      url: {
        type: String,
        validate: [validator.isURL, "Please provide a valid thumbnail URL"],
        default:
          "https://images.unsplash.com/photo-1521575107034-e0fa0b594529?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1468&q=80",
      },
      public_id: String,
    },

    // global tags
    globalTag: {
      type: String,
      enum: ["featured", "weekly-best", "preemptive", "none"],
      default: "none",
    },

    // read time
    readTime: {
      type: Number,
      required: [true, "Read time must be integrated"],
      min: [1, "Post read time won't be less than 1"],
      max: [120, "Post read time won't be more than 5"],
      default: 1,
    },

    // for tag account time stamps
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

/* create post model schema */
const Post = mongoose.model("Post", postSchema);

/* export post schema */
module.exports = Post;
