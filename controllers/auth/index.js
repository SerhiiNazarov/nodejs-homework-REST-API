const { register } = require("./registerUser");
const { login } = require("./loginUser");
const { getCurrent } = require("./getCurrentUser");
const { logout } = require("./logoutUser");
const { updateAvatar } = require("./updateAvatar");

module.exports = {
  register,
  login,
  getCurrent,
  logout,
  updateAvatar,
};
