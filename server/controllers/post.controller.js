const postService = require("../services/post.service");

exports.postNewPost = async (req, res, next) => {
  const result = await postService.postNewPost(req.body);

  try {
    res.status(201).json({
      acknowledgement: true,
      message: "Created",
      description: "Post new post successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

exports.getAllPosts = async (req, res, next) => {
  try {
    const result = await postService.getAllPosts(req.query);

    res.status(200).json({
      acknowledgement: true,
      message: "OK",
      description: "Fetching all posts successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

exports.getPost = async (req, res, next) => {
  try {
    const result = await postService.getPost(req.params);

    res.status(200).json({
      acknowledgement: true,
      message: "OK",
      description: "Fetch existing post successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

exports.updatePost = async (req, res, next) => {
  try {
    const result = await postService.updatePost(req.params.id, req.body);

    res.status(202).json({
      acknowledgement: true,
      message: "Accepted",
      description: "Update existing post successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    const result = await postService.deletePost(req.params);

    res.status(202).json({
      acknowledgement: true,
      message: "Accepted",
      description: "Delete existing post successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
