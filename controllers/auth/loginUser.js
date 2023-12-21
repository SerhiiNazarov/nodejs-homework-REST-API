const { User } = require("../../models/user");
const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
require("dotenv").config();

// const { SECRET_KEY } = process.env;

const { HttpError, ctrlWrapper } = require("../../helpers");

const login = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(401, "Email or password wrong");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  // const payload = {
  //   id: user._id,
  // };

  // const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

  // await User.findByIdAndUpdate(user._id, { token });

  res.status(200).json({
    // token,
    user: {
      name,
      email,
    },
  });
};

module.exports = {
  login: ctrlWrapper(login),
};
