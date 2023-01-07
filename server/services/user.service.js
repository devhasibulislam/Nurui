/* internal imports */
const User = require("../models/User");
const emailConfirmationToken = require("../utils/emailConfirmationToken.util");
const imageRemover = require("../utils/imageRemover.util");

/* find by email utility */
async function findByEmail(email, filter) {
  return await User.findOne({ email: email }).select(
    filter ? "name email avatar phone role status _id" : ""
  );
}

/* confirmation email utility */
function confirmByEmail(email, token, protocol, host, slug) {
  emailConfirmationToken(email, token, protocol, host, slug);
}

/* check expire utility */
function isExpire(date) {
  const expired = new Date() > new Date(date);
  return expired;
}

/* sign up an user */
exports.signUpAnUser = async (data, protocol, host) => {
  const user = await User.create(data);
  const token = user.generateCredentialToken("sign-up");

  await user.save({ validateBeforeSave: false });
  confirmByEmail(user.email, token, protocol, host, "sign-up");

  return user;
};

/* confirm signed up user */
exports.confirmSignedUpUser = async (token) => {
  const user = await User.findOne({ confirmationToken: token });
  const expired = isExpire(user.confirmationTokenExpires);

  if (!user || expired) {
    return { acknowledgement: false };
  }

  user.status = "active";
  user.confirmationToken = undefined;
  user.confirmationTokenExpires = undefined;
  user.save({ validateBeforeSave: false });

  return user;
};

/* sign in an user */
exports.signInAnUser = async ({ email, password }) => {
  const user = await User.findOne({ email });

  if (!user) {
    return { acknowledgement: false };
  }

  const isPasswordValid = user.comparePassword(password, user.password);
  if (isPasswordValid === false) {
    return { invalidPassword: true };
  }

  if (user.status !== "active") {
    return { invalidStatus: true };
  }

  return user;
};

/* retain a user after, login based token expiry */
exports.persistMeLogin = async (id) => {
  const user = await User.findById(id)
    .select("-password")
    .populate([
      {
        path: "posts",
        select: "-__v",
        populate: [
          {
            path: "creator",
            select: "-__v",
          },
          {
            path: "tags",
            select: "-__v",
          },
        ],
      },
      {
        path: "tags",
        select: "-__v",
        populate: [
          {
            path: "creator",
            select: "-__v",
          },
          {
            path: "posts",
            select: "-__v",
          },
        ],
      },
    ]);
  return user;
};

/* display all users */
exports.displayAllUsers = async (query) => {
  const users = await User.find(query).select("-password").sort("-updatedAt");
  return users;
};

/* reset user account password */
exports.forgotPassword = async ({ email, password }, protocol, host) => {
  const user = await findByEmail(email, true);

  if (!user) {
    return { acknowledgement: false };
  }

  const token = user.generateCredentialToken("reset-password");
  const hashedPassword = user.encryptedPassword(password);

  await User.findOneAndUpdate(
    { email },
    { $set: { password: hashedPassword } },
    { runValidators: true }
  );

  user.status = "inactive";
  await user.save({ validateBeforeSave: false });
  confirmByEmail(email, token, protocol, host, "reset-password");

  return user;
};

/* confirm reset user password */
exports.confirmPasswordReset = async (token) => {
  const user = await User.findOne({ passwordResetToken: token });
  const expired = isExpire(user.passwordResetTokenExpires);

  if (expired) {
    return { acknowledgement: false };
  }

  user.status = "active";
  user.passwordChangedAt = Date.now();
  user.passwordResetToken = undefined;
  user.passwordResetTokenExpires = undefined;
  user.save({ validateBeforeSave: false });

  return user;
};

/* remove a user account */
exports.removeAnUser = async (id) => {
  const user = await User.findById(id);

  if (!user) {
    return { acknowledgement: false };
  }

  if (user.role === "admin") {
    return { invalidRole: true };
  }

  if (user.role !== "admin" && user?.avatar?.public_id !== "") {
    const public_id = user?.avatar?.public_id;
    await imageRemover(public_id);
  }

  const result = await User.findByIdAndDelete(id);
  return result;
};

exports.updateUser = async (email, data) => {
  const result = await User.findOneAndUpdate({ email: email }, data, {
    runValidators: false,
  });
  return result;
};

exports.displayUser = async (email) => {
  const result = await User.findOne({ email })
    .select("-password")
    .populate([
      {
        path: "posts",
        select: "-__v",
      },
      {
        path: "tags",
        select: "-__v",
      },
    ]);
  return result;
};
