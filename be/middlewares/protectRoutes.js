import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({
        statusCode: 401,
        body: null,
        error: "Unauthorized - No token provided",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({
        statusCode: 401,
        body: null,
        error: "Unauthorized - Invalid token!",
      });
    }
    const user = await User.findById(decoded?.userId);
    if (!user) {
      return res.status(404).json({
        statusCode: 404,
        body: null,
        error: "User not found",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error("Error in protectRoute middleware", error?.message);
    res.status(500).json({
      statusCode: 500,
      body: null,
      error: error?.message,
    });
  }
};
