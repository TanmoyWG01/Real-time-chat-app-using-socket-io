import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import { GenerateToken } from "../Token/GenerateToken.js";

//Register user
export const registerUser = async (req, res) => {
  const { name, email, password, pic } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Please enter all the fields!" });
  }

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists!" });
    }

    const user = await User.create({ name, email, password, pic });

    if (user) {
      return res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        pic: user.pic,
        token: GenerateToken(user._id),
      });
    } else {
      return res.status(400).json({ message: "Failed to create user!" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//login User
export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: GenerateToken(user._id), // Generate token
    });
  } else {
    res.status(400).json({ message: "Invalid email or password!" });
  }
});

// search-user-by-name

export const allUser = async (req, res) => {
  try {
    const keyword = req.query.search
      ? {
          $or: [
            { name: { $regex: `^${req.query.search}`, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {};
    const users = await User.find(keyword)
      .find({ _id: { $ne: req.user._id } })
      .select("-password");

    // Send the response
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};
