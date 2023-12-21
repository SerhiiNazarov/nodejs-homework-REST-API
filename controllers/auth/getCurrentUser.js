require("dotenv").config();
const { ctrlWrapper } = require("../../helpers");

const getCurrent = (req, res) => {
  const { name, email } = req.user;

  res.json({
    name,
    email,
  });
};

module.exports = {
  getCurrent: ctrlWrapper(getCurrent),
};
