const { User } = require("../../models/user");

require("dotenv").config();

const { HttpError, ctrlWrapper } = require("../../helpers");

const login = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(401, "There is no such user");
  }

  if (password !== user.password) {
    throw HttpError(401, "Password is wrong");
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
