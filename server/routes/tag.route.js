/* external import */
const express = require("express");

/* internal import */
const imageController = require("../controllers/image.controller");
const upload = require("../middlewares/upload.middleware");
const tagController = require("../controllers/tag.controller");
const verify = require("../middlewares/verify.middleware");
const authorize = require("../middlewares/authorize.middleware");

/* router level connection */
const router = express.Router();

/* router methods integration */
// upload tag thumbnail
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

// CRUD on tags
router.post(
  "/new",
  verify,
  authorize("admin", "user"),
  tagController.postNewTag
);
router.get("/all", tagController.getAllTags);
router.get("/single/:id", tagController.getTag);
router.patch(
  "/update/:id",
  verify,
  authorize("admin", "user"),
  tagController.updateTag
);
router.delete(
  "/delete/:id",
  verify,
  authorize("admin", "user"),
  tagController.deleteTag
);

/* export tag router */
module.exports = router;
