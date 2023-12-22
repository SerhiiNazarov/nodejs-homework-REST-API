const { User } = require("../../models/user");

require("dotenv").config();

const gravatar = require("gravatar");

const { HttpError, ctrlWrapper } = require("../../helpers");

const register = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email in use");
  }

  const avatarURL = gravatar.url(email);

  const newUser = await User.create({
    ...req.body,
    avatarURL,
  });


  res.status(201).json({
    user: {
      name: newUser.name,
      email: newUser.email,
    },
  });
};

module.exports = {
  register: ctrlWrapper(register),
};
