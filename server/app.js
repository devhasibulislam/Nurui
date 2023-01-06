/**
 * Title: Initial segment of this project
 * Description: All application level tasks execute here
 * Author: Hasibul Islam
 * Date: 03/01/2023
 */

/* external imports */
const express = require("express");
const cors = require("cors");

/* internal imports */
const error = require("./middlewares/error.middleware");

/* router level imports */
const userRouter = require("./routes/user.route");
const tagRoute = require("./routes/tag.route");
const postRoute = require("./routes/post.route");

/* application level connections */
const app = express();

/* middlewares connections */
app.use(
  cors({
    origin: "*",
    methods: "GET, PATCH, POST, DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);
app.use(express.json());

/* router level connections */
app.use("/user", userRouter);
app.use("/tags", tagRoute);
app.use("/post", postRoute);


/* global error handlers */
app.use(error);

/* enable connection */
app.get("/", (req, res) => {
  try {
    res.status(200).json({
      acknowledgement: true,
      message: "OK",
      description:
        "The message body contains the request message of Nurui as received by the server.",
    });
  } catch (error) {
    res.status(204).json({
      acknowledgement: false,
      message: error.name,
      description: error.message,
    });
  }
});

/* export application */
module.exports = app;
