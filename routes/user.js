import express from 'express';
import { userRegister, loginUser, fetchUsers, deleteUsers, fetchUserDetails, userProfile, updateUser, updateUserPassword, followingUser, unfollowUser, UpdateBlockUser, unBlockUser, generateVerificationToken } from '../controllers/user.js';
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
userRoutes.put("/password", isLoggedIn, updateUserPassword);
userRoutes.put("/follow", isLoggedIn, followingUser);
userRoutes.post(
    "/generate-verify-email-token", isLoggedIn, generateVerificationToken
);

// userRoutes.put("/verify-account", authMiddleware, accountVerification);
userRoutes.put("/unfollow", isLoggedIn, unfollowUser);
userRoutes.put("/block-user/:id", isLoggedIn, UpdateBlockUser);
userRoutes.put("/unblock-user/:id", isLoggedIn, unBlockUser);
userRoutes.get("/profile/:id", isLoggedIn, userProfile);
userRoutes.put("/:id", isLoggedIn, updateUser);
userRoutes.delete("/:id", deleteUsers);
userRoutes.get("/:id", fetchUserDetails);

export default userRoutes;

