import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import User from '../models/User.js';

// const sgMail = require("@sendgrid/mail");
// const fs = require("fs");
// const crypto = require("crypto");
// const User = require("../models/User");
// const validateMongodbId = require("../../utils/validateMongodbID");
// const cloudinaryUploadImg = require("../../utils/cloudinary");
// const blockUser = require("../../utils/blockUser");
// sgMail.setApiKey(process.env.SEND_GRID_API_KEY);

// @desc Register user
// @route POST /api/users/register
// @acces Public
export const userRegister = asyncHandler(async (req, res) => {
  //Check if user Exist
  const userExists = await User.findOne({ email: req?.body?.email });

  if (userExists) throw new Error("User already exists");
  try {
    //Register user
    const user = await User.create({
      firstName: req?.body?.firstName,
      lastName: req?.body?.lastName,
      email: req?.body?.email,
      password: req?.body?.password,
    });
    res.json(user);
  } catch (error) {
    // throw new Error(error)
    res.json(error);
  }
});

// @desc Login user
// @route POST /api/users/login
// @acces Public
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  //check if user exists
  const userFound = await User.findOne({ email });
  //check if blocked
  if (userFound?.isBlocked)
    throw new Error("Access Denied You have been blocked");
  if (userFound && (await userFound.isPasswordMatched(password))) {
    //Check if password is match
    res.json({
      _id: userFound?._id,
      firstName: userFound?.firstName,
      lastName: userFound?.lastName,
      email: userFound?.email,
      profilePhoto: userFound?.profilePhoto,
      isAdmin: userFound?.isAdmin,
      token: generateToken(userFound?._id),
      isVerified: userFound?.isAccountVerified,
    });
  } else {
    res.status(401);
    throw new Error("Invalid Login Credentials");
  }
});

// //------------------------------
// //Users
// //-------------------------------
export const fetchUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find({})
    // .populate("posts");
    res.json(users);
  } catch (error) {
    throw new Error(error);
  }
});

// //------------------------------
// //Delete user
// //------------------------------
// const deleteUsers = asyncHandler(async (req, res) => {
//   const { id } = req.params;
//   //check if user id is valid
//   validateMongodbId(id);
//   try {
//     const deletedUser = await User.findByIdAndDelete(id);
//     res.json(deletedUser);
//   } catch (error) {
//     res.json(error);
//   }
// });

// //----------------
// //user details
// //----------------
// const fetchUserDetails = asyncHandler(async (req, res) => {
//   const { id } = req.params;
//   //check if user id is valid
//   validateMongodbId(id);
//   try {
//     const user = await User.findById(id);
//     res.json(user);
//   } catch (error) {
//     res.json(error);
//   }
// });

// //------------------------------
// //User profile
// //------------------------------
// const userProfile = asyncHandler(async (req, res) => {
//   const { id } = req.params;
//   validateMongodbId(id);
//   //1.Find the login user
//   //2. Check this particular if the login user exists in the array of viewedBy

//   //Get the login user
//   const loginUserId = req?.user?._id?.toString();
//   console.log(typeof loginUserId);
//   try {
//     const myProfile = await User.findById(id)
//       .populate("posts")
//       .populate("viewedBy");
//     const alreadyViewed = myProfile?.viewedBy?.find(user => {
//       console.log(user);
//       return user?._id?.toString() === loginUserId;
//     });
//     if (alreadyViewed) {
//       res.json(myProfile);
//     } else {
//       const profile = await User.findByIdAndUpdate(myProfile?._id, {
//         $push: { viewedBy: loginUserId },
//       });
//       res.json(profile);
//     }
//   } catch (error) {
//     res.json(error);
//   }
// });

// //------------------------------
// //Update profile
// //------------------------------
// const updateUser = asyncHandler(async (req, res) => {
//   const { _id } = req?.user;
//   //block
//   blockUser(req?.user);
//   validateMongodbId(_id);
//   const user = await User.findByIdAndUpdate(
//     _id,
//     {
//       firstName: req?.body?.firstName,
//       lastName: req?.body?.lastName,
//       email: req?.body?.email,
//       bio: req?.body?.bio,
//     },
//     {
//       new: true,
//       runValidators: true,
//     }
//   );
//   res.json(user);
// });

// //------------------------------
// //Update password
// //------------------------------

// const updateUserPassword = asyncHandler(async (req, res) => {
//   //destructure the login user
//   const { _id } = req.user;
//   const { password } = req.body;
//   validateMongodbId(_id);
//   //Find the user by _id
//   const user = await User.findById(_id);

//   if (password) {
//     user.password = password;
//     const updatedUser = await user.save();
//     res.json(updatedUser);
//   } else {
//     res.json(user);
//   }
// });

// //------------------------------
// //following
// //------------------------------

// const followingUser = asyncHandler(async (req, res) => {
//   //1.Find the user you want to follow and update it's followers field
//   //2. Update the login user following field
//   const { followId } = req.body;
//   const loginUserId = req.user.id;

//   //find the target user and check if the login id exist
//   const targetUser = await User.findById(followId);

//   const alreadyFollowing = targetUser?.followers?.find(
//     user => user?.toString() === loginUserId.toString()
//   );

//   if (alreadyFollowing) throw new Error("You have already followed this user");

//   //1. Find the user you want to follow and update it's followers field
//   await User.findByIdAndUpdate(
//     followId,
//     {
//       $push: { followers: loginUserId },
//       isFollowing: true,
//     },
//     { new: true }
//   );

//   //2. Update the login user following field
//   await User.findByIdAndUpdate(
//     loginUserId,
//     {
//       $push: { following: followId },
//     },
//     { new: true }
//   );
//   res.json("You have successfully followed this user");
// });

// //------------------------------
// //unfollow
// //------------------------------

// const unfollowUser = asyncHandler(async (req, res) => {
//   const { unFollowId } = req.body;
//   const loginUserId = req.user.id;

//   await User.findByIdAndUpdate(
//     unFollowId,
//     {
//       $pull: { followers: loginUserId },
//       isFollowing: false,
//     },
//     { new: true }
//   );

//   await User.findByIdAndUpdate(
//     loginUserId,
//     {
//       $pull: { following: unFollowId },
//     },
//     { new: true }
//   );

//   res.json("You have successfully unfollowed this user");
// });

// //------------------------------
// //Block user
// //------------------------------

// const blockUser = asyncHandler(async (req, res) => {
//   const { id } = req.params;
//   validateMongodbId(id);

//   const user = await User.findByIdAndUpdate(
//     id,
//     {
//       isBlocked: true,
//     },
//     { new: true }
//   );
//   res.json(user);
// });

// //------------------------------
// //Block user
// //------------------------------

// const unBlockUser = asyncHandler(async (req, res) => {
//   const { id } = req.params;
//   validateMongodbId(id);

//   const user = await User.findByIdAndUpdate(
//     id,
//     {
//       isBlocked: false,
//     },
//     { new: true }
//   );
//   res.json(user);
// });

// //------------------------------
// // Generate Email verification token
// //------------------------------
// const generateVerificationToken = asyncHandler(async (req, res) => {
//   const loginUserId = req.user.id;
//   const user = await User.findById(loginUserId);

//   try {
//     //Generate token
//     const verificationToken = await user?.createAccountVerificationToken();
//     //save the user
//     await user.save();
//     console.log(verificationToken);
//     //build your message
//     const resetURL = `If you were requested to verify your account, verify now within 10 minutes, otherwise ignore this message <a href="http://localhost:3000/verify-account/${verificationToken}">Click to verify your account</a>`;

//     const msg = {
//       to: user?.email,
//       from: "twentekghana@gmail.com",
//       subject: "Verify your account",
//       html: resetURL,
//     };
//     await sgMail.send(msg);
//     res.json(resetURL);
//   } catch (error) {
//     res.json(error);
//   }
// });

// //------------------------------
// //Account verification
// //------------------------------
// const accountVerification = asyncHandler(async (req, res) => {
//   const { token } = req.body;
//   const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
//   //find this user by token
//   const userFound = await User.findOne({
//     accountVerificationToken: hashedToken,
//     accountVerificationTokenExpires: { $gt: new Date() },
//   });
//   if (!userFound) throw new Error("Token expired, try again later");
//   //update the proprt to true
//   userFound.isAccountVerified = true;
//   userFound.accountVerificationToken = undefined;
//   userFound.accountVerificationTokenExpires = undefined;
//   await userFound.save();
//   res.json(userFound);
// });

// //------------------------------
// //Forget token generator
// //------------------------------

// const forgetPasswordToken = asyncHandler(async (req, res) => {
//   //find the user by email
//   const { email } = req.body;

//   const user = await User.findOne({ email });
//   if (!user) throw new Error("User Not Found");

//   try {
//     //Create token
//     const token = await user.createPasswordResetToken();

//     await user.save();

//     //build your message
//     const resetURL = `If you were requested to reset your password, reset now within 10 minutes, otherwise ignore this message <a href="http://localhost:3000/reset-password/${token}">Click to Reset</a>`;
//     const msg = {
//       to: email,
//       from: "twentekghana@gmail.com",
//       subject: "Reset Password",
//       html: resetURL,
//     };

//     await sgMail.send(msg);
//     res.json({
//       msg: `A verification message is successfully sent to ${user?.email}. Reset now within 10 minutes, ${resetURL}`,
//     });
//   } catch (error) {
//     res.json(error);
//   }
// });

// //------------------------------
// //Password reset
// //------------------------------

// const passwordReset = asyncHandler(async (req, res) => {
//   const { token, password } = req.body;
//   const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

//   //find this user by token
//   const user = await User.findOne({
//     passwordResetToken: hashedToken,
//     passwordResetExpires: { $gt: Date.now() },
//   });
//   if (!user) throw new Error("Token Expired, try again later");

//   //Update/change the password
//   user.password = password;
//   user.passwordResetToken = undefined;
//   user.passwordResetExpires = undefined;
//   await user.save();
//   res.json(user);
// });
// //------------------------------
// //Profile photo upload
// //------------------------------

// const profilePhotoUpload = asyncHandler(async (req, res) => {
//   //Find the login user
//   const { _id } = req.user;
//   //block user
//   blockUser(req?.user);
//   //1. Get the oath to img
//   const localPath = `public/images/profile/${req.file.filename}`;
//   //2.Upload to cloudinary
//   const imgUploaded = await cloudinaryUploadImg(localPath);

//   const foundUser = await User.findByIdAndUpdate(
//     _id,
//     {
//       profilePhoto: imgUploaded?.url,
//     },
//     { new: true }
//   );
//   //remove the saved img
//   fs.unlinkSync(localPath);
//   res.json(imgUploaded);
// });


