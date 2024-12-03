import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      // console.log("Authorization Token:", token);

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find user
      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      next();
    } catch (error) {
      console.error("Token verification error:", error.message);

      if (error.name === "TokenExpiredError") {
        res.status(401).json({ message: "Token expired" });
      } else {
        res.status(401).json({ message: "Not authorized, token failed" });
      }
    }
  } else {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};
