/**
 * Title: Driver segment of this project
 * Description: All driver level task execute here
 * Author: Hasibul Islam
 * Date: 03/01/2023
 */

/* external imports */
const mongoose = require("mongoose");
require("dotenv").config();

/* internal import */
const app = require("./app");
const consoleMessage = require("./utils/console.util");

/* database connection */
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.ATLAS_URI, {
    dbName: process.env.DB_NAME,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    consoleMessage.successMessage(
      `Establish connection on ${process.env.SERVER_URL}`
    )
  )
  .catch((error) => consoleMessage.errorMessage(error.message));

/* establish server port */
app.listen(process.env.PORT, () => {
  consoleMessage.successMessage(`App listening on ${process.env.SERVER_URL}`);
});

/**
 * DeprecationWarning: Mongoose: the `strictQuery` option will be switched back to `false` by default in Mongoose 7
 * https://stackoverflow.com/questions/74747476/deprecationwarning-mongoose-the-strictquery-option-will-be-switched-back-to
 */
