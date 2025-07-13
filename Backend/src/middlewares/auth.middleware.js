import jwt from "jsonwebtoken";
import { db } from "../libs/db.js";

export const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "You are not logged in." });
  }

  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

  if (!decoded) {
    return res.status(401).json({ message: "Invalid Access token." });
  }

  const user = await db.user.findUnique({
    where: {
      id: decoded.id,
    },
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
    return res.status(401).json({ message: "User not found." });
  }

  req.user = user;

  next();
};

//Role-based access control(RBAC) middleware
export const checkAdmin = async (req, res, next) => {
  const userId = req.user.id;

  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      role: true,
    },
  });

  if (!user || user.role !== "ADMIN") {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }

  next();
};
