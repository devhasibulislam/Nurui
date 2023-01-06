const tagService = require("../services/tag.service");

exports.postNewTag = async (req, res, next) => {
  const result = await tagService.postNewTag(req.body);

  try {
    res.status(201).json({
      acknowledgement: true,
      message: "Created",
      description: "Post new tag successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

exports.getAllTags = async (req, res, next) => {
  try {
    const result = await tagService.getAllTags(req.query);

    res.status(200).json({
      acknowledgement: true,
      message: "OK",
      description: "Fetching all tags successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

exports.getTag = async (req, res, next) => {
  try {
    const result = await tagService.getTag(req.params);

    res.status(200).json({
      acknowledgement: true,
      message: "OK",
      description: "Fetch existing tag successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateTag = async (req, res, next) => {
  try {
    const result = await tagService.updateTag(req.params.id, req.body);

    res.status(202).json({
      acknowledgement: true,
      message: "Accepted",
      description: "Update existing tag successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteTag = async (req, res, next) => {
  try {
    const result = await tagService.deleteTag(req.params);

    res.status(204).json({
      acknowledgement: true,
      message: "No Content",
      description: "Delete existing tag successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
