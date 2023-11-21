const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const userController = require("../controllers/user.controller");

router.get("/users/check-field", userController.checkField);
router.post("/users", userController.createUser);
router.post("/users/login", userController.loginUser);
router.post("/users/send-method")
router.patch(
  "/users/:id/change-password",
  authMiddleware,
  userController.changePassword
);
router.post("/users/forgot-password", userController.forgotPassword);
router.post("/users/reset-password", userController.resetPassword);
router.post("/users/logout", authMiddleware, userController.logoutUser);
router.get("/users/:id/followers", authMiddleware, userController.getFollowers);
router.get("/users/:id/following", authMiddleware, userController.getFollowing);
router.post(
  "/users/:userId/follow/:followerId",
  authMiddleware,
  userController.followUser
);
router.post(
  "/users/:userId/unfollow/:followerId",
  authMiddleware,
  userController.unfollowUser
);
router.post(
  "/users/:userId/block/:blockerId",
  authMiddleware,
  userController.blockUser
);
router.post(
  "/users/:userId/unblock/:unblockerId",
  authMiddleware,
  userController.unblockUser
);
router.patch(
  "/users/:userId/settings",
  authMiddleware,
  userController.notificationSettings
);
router.get(
  "/users/:userId/activity",
  authMiddleware,
  userController.activityHistory
);
router.get("/users", userController.getAllUsers);
router.get("/users/:id", authMiddleware, userController.getUserById);
router.get("/user", authMiddleware, userController.getUser);
router.patch("/users/:id", authMiddleware, userController.updateUser);
router.delete("/users/:id", authMiddleware, userController.deleteUser);

module.exports = router;
