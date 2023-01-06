/* external import */
const express = require("express");

/* internal import */
const imageController = require("../controllers/image.controller");
const upload = require("../middlewares/upload.middleware");
const tagController = require("../controllers/tag.controller");

/* router level connection */
const router = express.Router();

/* router methods integration */
// upload tag thumbnail
router
  .route("/thumbnail")
  .post(upload.single("thumbnail"), imageController.imageUpload)
  .patch(upload.single("thumbnail"), imageController.imageUpdate);

// CRUD on tags
router.post("/new", tagController.postNewTag);
router.get("/all", tagController.getAllTags);
router.get("/single/:id", tagController.getTag);
router.patch("/update/:id", tagController.updateTag);
router.delete("/delete/:id", tagController.deleteTag);

/* export tag router */
module.exports = router;
