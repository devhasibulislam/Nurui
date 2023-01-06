/* external import */
const express = require("express");

/* internal import */
const imageController = require("../controllers/image.controller");
const upload = require("../middlewares/upload.middleware");
const postController = require("../controllers/post.controller");

/* router level connection */
const router = express.Router();

/* router methods integration */
// upload post thumbnail
router
  .route("/thumbnail")
  .post(upload.single("thumbnail"), imageController.imageUpload)
  .patch(upload.single("thumbnail"), imageController.imageUpdate);

// CRUD on post
router.post("/new", postController.postNewPost);
router.get("/all", postController.getAllPosts);
router.get("/single/:id", postController.getPost);
router.patch("/update/:id", postController.updatePost);
router.delete("/delete/:id", postController.deletePost);

/* export post router */
module.exports = router;
