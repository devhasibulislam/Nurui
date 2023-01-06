/* external imports */
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const validator = require("validator");

const tagSchema = new mongoose.Schema(
  {
    // for absorbing posts
    posts: [
      {
        type: ObjectId,
        ref: "Post",
      },
    ],

    // tag creator
    creator: {
      type: ObjectId,
      ref: "User",
    },

    // for tag title
    title: {
      type: String,
      required: [true, "Please, provide tag title"],
      trim: true,
      lowercase: true,
      unique: [true, "Already exist, try new"],
      minLength: [3, "Tag must be at least 3 characters"],
      maxLength: [50, "Tag would be at most 50 characters"],
    },

    // for tag thumbnail
    thumbnail: {
      url: {
        type: String,
        validate: [validator.isURL, "Please provide a valid thumbnail URL"],
        default:
          "https://images.unsplash.com/photo-1571907483091-fbe746bee132?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      },
      public_id: String,
    },

    // for tag description
    description: {
      type: String,
      required: [true, "Please, provide tag description"],
      trim: true,
      minLength: [10, "Tag must be at least 10 characters"],
      maxLength: [250, "Tag would be at most 250 characters"],
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

/* create tag model schema */
const Tag = mongoose.model("Tag", tagSchema);

/* export tag schema */
module.exports = Tag;
