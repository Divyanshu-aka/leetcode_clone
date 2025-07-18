import { asyncHandler } from "../utils/async-handler.js";
import { ApiResponse } from "../utils/api-response.js";
import {
  sendMail,
  verificationEmailContentGen,
  forgotPasswordEmailContentGen,
} from "../utils/mail.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { db } from "../libs/db.js";
import { UserRole } from "../generated/prisma/index.js";

const registerUser = asyncHandler(async (req, res) => {
  const { email, username, fullname, password } = req.body; //get user data from request body

  if (!email || !username || !password) {
    return res
      .status(400)
      .json(new ApiResponse(400, "All fields are required."));
  }

  const existingUser = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    return res
      .status(400)
      .json(new ApiResponse(400, "User with this email already exists."));
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await db.user.create({
    data: {
      email,
      fullname,
      username,
      password: hashedPassword,
      role: UserRole.USER,
    },
  });

  const unhashedToken = crypto.randomBytes(32).toString("hex");
  const hashedToken = crypto
    .createHash("sha256")
    .update(unhashedToken)
    .digest("hex");
  const tokenExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes from now

  const verificationUrl = `${process.env.BASE_URL}/api/v1/auth/verify/${unhashedToken}`;

  console.log("Verification URL:", verificationUrl);

  sendMail({
    email: newUser.email,
    subject: "Email Verification",
    mailGenContent: verificationEmailContentGen(username, verificationUrl),
  });

  const updatedUser = await db.user.update({
    where: { id: newUser.id },
    data: {
      emailVerificationToken: hashedToken,
      emailVerificationTokenExpiry: new Date(tokenExpiry),
      lastverificationEmailSent: new Date(),
    },
  });

  console.log("Updated user:", updatedUser);

  res.json(
    new ApiResponse(201, {
      message:
        "User created successfully. Please check your email to verify your account.",
    })
  );
});

//verify user email
const verifyUserEmail = asyncHandler(async (req, res) => {
  const { token } = req.params;

  if (!token) {
    return res.status(400).json(new ApiResponse(400, "Invalid Token"));
  }

  const hashedtoken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await db.user.findFirst({
    where: {
      emailVerificationToken: hashedtoken,
      emailVerificationTokenExpiry: { gt: new Date() }, // Check if the token is still valid
    },
  });

  if (!user) {
    return res
      .status(404)
      .json(new ApiResponse(404, "User not found or token expired"));
  }

  const updated = await db.user.update({
    where: { id: user.id },
    data: {
      emailVerified: true,
      emailVerificationToken: null, // Clear the token after verification
      emailVerificationTokenExpiry: null, // Clear the expiry after verification
      lastverificationEmailSent: null, // Clear the last sent time after verification
    },
  });

  console.log("User email verified:", updated);

  res.status(200).json(
    new ApiResponse(200, {
      message: "Email verified successfully",
    })
  );
});

//login user
const loginUser = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body; //get user data from request body

  if ((!email && !username) || !password) {
    return res
      .status(400)
      .json(new ApiResponse(400, "All fields are required."));
  }

  const user = await db.user.findFirst({
    where: {
      OR: [{ email: email }, { username: username }],
    },
  });

  if (!user) {
    return res.status(404).json(new ApiResponse(404, "User not found."));
  }

  const verifiedPassword = await bcrypt.compare(password, user.password);
  if (!verifiedPassword) {
    return res.status(401).json(new ApiResponse(401, "Invalid password."));
  }

  const accessToken = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "15m" }
  );

  const refreshToken = jwt.sign(
    { id: user.id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY || "7d" }
  );

  console.log("Access Token:", accessToken);
  console.log("Refresh Token:", refreshToken);

  const updated = await db.user.update({
    where: { id: user.id },
    data: { refreshToken },
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 24 * 60 * 60 * 1000, // 24 hrs
  });

  console.log("Logged in user:", user.username, updated);

  res.json(
    new ApiResponse(200, {
      message: "Login successful",
      data: {
        accessToken,
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          fullname: user.fullname,
          role: user.role,
        },
      },
    })
  );
});

const profile = asyncHandler(async (req, res) => {
  const user = await db.user.findUnique({
    where: { id: req.user.id },
    select: {
      id: true,
      image: true,
      fullname: true,
      username: true,
      email: true,
      role: true,
    },
  });

  if (!user) {
    return res.status(404).json(new ApiResponse(404, "User not found."));
  }

  console.log("User profile:", user);

  res
    .status(200)
    .json(new ApiResponse(200, user, "User profile fetched successfully."));
});

const logoutUser = asyncHandler(async (req, res) => {
  const user = await db.user.update({
    where: { id: req.user.id },
    data: { refreshToken: null }, // Clear the refresh token
  });

  res.clearCookie("refreshToken"); // Clear the cookie

  console.log("User logged out:", user);

  res.status(200).json(new ApiResponse(200, "Logout successful."));
});

//resend verification email
const resendVerificationEmail = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.json(new ApiResponse(400, "Email is required."));
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.json(new ApiResponse(404, "User not found."));
  }

  if (user.isEmailVerified) {
    return res.json(new ApiResponse(400, "Email is already verified."));
  }

  // timeout for resending verification email
  const lastSent = user.lastVerificationEmailSent;
  if (lastSent && Date.now() - lastSent < 2 * 60 * 1000) {
    const remainingTime = Math.ceil(
      (2 * 60 * 1000 - (Date.now() - lastSent)) / 1000 // 2 minutes
    );
    return res.json(
      new ApiResponse(
        429,
        `Please wait ${remainingTime} seconds before requesting another verification email.`
      )
    );
  }

  const { unhashedToken, hashedToken, tokenExpiry } =
    user.generateTemporaryToken();
  user.emailVerificationToken = hashedToken;
  user.emailVerificationExpiry = tokenExpiry;
  user.lastVerificationEmailSent = Date.now();

  await user.save();

  const verificationUrl = `${process.env.BASE_URL}/api/v1/auth/verify/${unhashedToken}`;

  sendMail({
    email: user.email,
    subject: " Resend Verification",
    mailGenContent: verificationEmailContentGen(user.username, verificationUrl),
  });

  res.json(
    new ApiResponse(200, {
      message: "Verification email resent successfully.",
    })
  );
});

//refresh access token
//forgot password request
//change current password
//get current user

const check = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "User authenticated successfully",
      user: req.user,
    });
  } catch (error) {
    console.error("Error checking user:", error);
    res.status(500).json({
      error: "Error checking user",
    });
  }
};

export {
  registerUser,
  verifyUserEmail,
  loginUser,
  profile,
  logoutUser,
  resendVerificationEmail,
  check,
};
