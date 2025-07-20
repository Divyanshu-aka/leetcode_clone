import express from "express";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes.js";
import problemRoutes from "./routes/problem.routes.js";
import executionRoutes from "./routes/execution.routes.js";
import submissionRoutes from "./routes/submission.routes.js";
import playlistRoutes from "./routes/playlist.routes.js";

import cookieParser from "cookie-parser";
import cors from "cors";
import { ApiError } from "./utils/api-error.js";
import { ApiResponse } from "./utils/api-response.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://fv1w1ts7-5173.inc1.devtunnels.ms",
      "https://facility-separately-magnetic-preliminary.trycloudflare.com",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Accept",
      "Origin",
    ],
    credentials: true,
  })
);

// Add cookie parser with secure options for dev tunnels
app.use(cookieParser());

// Add this middleware to handle cookie settings for dev tunnels
app.use((req, res, next) => {
  // Set cookie options based on environment
  const isDevTunnel = req.get("host")?.includes("devtunnels.ms");

  if (isDevTunnel) {
    res.cookie = (name, value, options = {}) => {
      const cookieOptions = {
        ...options,
        sameSite: "none",
        secure: true,
        domain: undefined, // Don't set domain for dev tunnels
      };
      return res.cookie.call(res, name, value, cookieOptions);
    };
  }
  next();
});

app.get("/", (req, res) => {
  res.send("hello......🥱🥱");
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/problems", problemRoutes);
app.use("/api/v1/execute-code", executionRoutes);
app.use("/api/v1/submission", submissionRoutes);
app.use("/api/v1/playlist", playlistRoutes);

app.use((err, req, res, next) => {
  console.error("Error caught:", err); // ← Add this to see all errors

  if (err instanceof ApiError) {
    console.error("API Error:", err);
    return res
      .status(err.statusCode)
      .json(new ApiResponse(err.statusCode, err.errors, err.message));
  }
  // Handle other errors
  res.status(500).json(new ApiResponse(500, [], "Internal Server Error"));
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
