const { User } = require("../../models/user");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { HttpError, ctrlWrapper } = require("../../helpers");

const { SECRET_KEY } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);

  const newUser = {
    ...req.body,
    password: hashPassword,
    avatarURL,
  };

  await User.create(newUser);

  const createdUser = await User.findOne({ email });

  const payload = {
    id: createdUser._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

  await User.findByIdAndUpdate(createdUser._id, { token });

  res.status(201).json({
    token,
    user: {
      name: createdUser.name,
      email: createdUser.email,
    },
  });
};

module.exports = {
  register: ctrlWrapper(register),
};
