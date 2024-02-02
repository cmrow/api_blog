import express from 'express';
import { userRegister, loginUser, fetchUsers, deleteUsers } from '../controllers/user.js';
import isLoggedIn from '../middlewares/isLoggedIn.js';
// const authMiddleware = require("../../middlewares/auth/authMiddleware");

// const {
//   photoUpload,
//   profilePhotoResize,
// } = require("../../middlewares/uploads/photoUpload");

const userRoutes = express.Router();

userRoutes.post("/register", userRegister);
userRoutes.post("/login", loginUser);
// userRoutes.put(
//   "/profilephoto-upload",
//   authMiddleware,
//   photoUpload.single("image"),
//   profilePhotoResize,
//   profilePhotoUpload
// );
userRoutes.get("/", isLoggedIn, fetchUsers);
// // Password reset
// userRoutes.post("/forget-password-token", forgetPasswordToken);
// userRoutes.put("/reset-password", passwordReset);
// userRoutes.put("/password", authMiddleware, updateUserPassword);
// userRoutes.put("/follow", authMiddleware, followingUser);
// userRoutes.post(
//   "/generate-verify-email-token",
//   authMiddleware,
//   generateVerificationToken
// );

// userRoutes.put("/verify-account", authMiddleware, accountVerification);
// userRoutes.put("/unfollow", authMiddleware, unfollowUser);
// userRoutes.put("/block-user/:id", authMiddleware, blockUser);
// userRoutes.put("/unblock-user/:id", authMiddleware, unBlockUser);
// userRoutes.get("/profile/:id", authMiddleware, userProfile);
// userRoutes.put("/", authMiddleware, updateUser);
userRoutes.delete("/:id", deleteUsers);
// userRoutes.get("/:id", fetchUserDetails);

export default userRoutes;
