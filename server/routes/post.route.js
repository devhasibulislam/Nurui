/* external import */
const express = require("express");

/* internal import */
const imageController = require("../controllers/image.controller");
const upload = require("../middlewares/upload.middleware");
const postController = require("../controllers/post.controller");
const verify = require("../middlewares/verify.middleware");
const authorize = require("../middlewares/authorize.middleware");

/* router level connection */
const router = express.Router();

/* router methods integration */
// upload post thumbnail
router
  .route("/thumbnail")
  .post(
    upload.single("thumbnail"),
    verify,
    authorize("admin", "user"),
    imageController.imageUpload
  )
  .patch(
    upload.single("thumbnail"),
    verify,
    authorize("admin", "user"),
    imageController.imageUpdate
  );

// CRUD on post
router.post(
  "/new",
  verify,
  authorize("admin", "user"),
  postController.postNewPost
);
router.get("/all", postController.getAllPosts);
router.get("/single/:id", postController.getPost);
router.patch(
  "/update/:id",
  verify,
  authorize("admin", "user"),
  postController.updatePost
);
router.delete(
  "/delete/:id",
  verify,
  authorize("admin", "user"),
  postController.deletePost
);

/* export post router */
module.exports = router;
