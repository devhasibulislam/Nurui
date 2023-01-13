/* external import */
const express = require("express");

/* internal import */
const userController = require("../controllers/user.controller");
const imageController = require("../controllers/image.controller");
const verify = require("../middlewares/verify.middleware");
const upload = require("../middlewares/upload.middleware");
const authorize = require("../middlewares/authorize.middleware");

/* router level connection */
const router = express.Router();

/* router methods integration */
// upload user avatar
router
  .route("/avatar")
  .post(upload.single("avatar"), imageController.imageUpload)
  .patch(
    upload.single("avatar"),
    verify,
    authorize("admin", "user"),
    imageController.imageUpdate
  );

// sign up an user with confirmation
router
  .route("/sign-up")
  .get(userController.confirmSignedUpUser)
  .post(userController.signUpAnUser);

// sign in an user
router.post("/sign-in", userController.signInAnUser);

// persist an user to logged in
router.get("/myself", verify, userController.persistMeLogin);

// fetch all user
router.get(
  "/all-users",
  verify,
  authorize("admin"),
  userController.displayAllUsers
);

// reset password
router
  .route("/reset-password")
  .get(userController.confirmPasswordReset)
  .patch(userController.forgotPassword);

// update an user
router.patch(
  "/update-user",
  verify,
  authorize("admin", "user"),
  userController.updateUser
);

// remove an user account
router.delete(
  "/remove-user",
  verify,
  authorize("admin", "user"),
  userController.removeAnUser
);

router.get(
  "/:email",
  userController.displayUser
);

/* export user router */
module.exports = router;
