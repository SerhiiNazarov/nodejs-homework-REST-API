const { User } = require("../../models/user");
const bcrypt = require("bcrypt");
require("dotenv").config();

const { HttpError, ctrlWrapper } = require("../../helpers");

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const name = user.name;

  if (!user) {
    throw HttpError(401, "There is no such user");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  res.status(200).json({
    user: {
      name,
      email,
    },
  });
};

module.exports = {
  login: ctrlWrapper(login),
};
