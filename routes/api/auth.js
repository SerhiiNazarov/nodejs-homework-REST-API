const express = require("express");

const {
  register,
  login,
  getCurrent,
  logout,
  // updateAvatar,
} = require("../../controllers/auth");

const { validateBody } = require("../../middlewares");

const { schemas } = require("../../models/user");

const router = express.Router();

router.post("/users/register", validateBody(schemas.registerSchema), register);

router.post("/users/login", validateBody(schemas.loginSchema), login);

router.get("/users/current", getCurrent);

router.post("/users/logout", logout);

// router.patch("/users/avatars", upload.single("avatar"), updateAvatar);

module.exports = router;
