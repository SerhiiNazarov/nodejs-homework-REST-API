const express = require("express");

const {
  register,
  login,
  getCurrent,
  logout,
  updateSubscription,
  updateAvatar,
  verifyEmail,
  resendVerifyEmail,
} = require("../../controllers/auth");

const { validateBody, authenticate, upload } = require("../../middlewares");

const { schemas } = require("../../models/user");

const router = express.Router();

router.post("/users/register", validateBody(schemas.registerSchema), register);

router.get("/users/verify/:verificationToken", verifyEmail);

router.post(
  "/users/verify",
  validateBody(schemas.emailSchema),
  resendVerifyEmail
);

router.post("/users/login", validateBody(schemas.loginSchema), login);

router.get("/users/current", authenticate, getCurrent);

router.post("/users/logout", authenticate, logout);

router.patch(
  "/users",
  authenticate,
  validateBody(schemas.updateSubscriptionSchems),
  updateSubscription
);

router.patch(
  "/users/avatars",
  authenticate,
  upload.single("avatar"),
  updateAvatar
);

module.exports = router;
