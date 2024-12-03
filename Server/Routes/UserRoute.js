import express from "express";
import {
  allUser,
  authUser,
  registerUser,
} from "../Controllers/user-controllers.js";
import { protect } from "../middleware/auth-middleware.js";

const router = express.Router();

router.route("/").post(registerUser).get(protect, allUser);
router.post("/login", authUser);

export default router;
