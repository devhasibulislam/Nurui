/* external import */
const jwt = require("jsonwebtoken");

module.exports = (user) => {
  // grab specific user info to generate jwt token
  const token = jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      membership: user.membership,
    },
    process.env.TOKEN_SECRET,
    {
      expiresIn: process.env.TOKEN_EXPIRY,
    }
  );

  return token;
};
