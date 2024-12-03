import express from "express";
import { protect } from "../middleware/auth-middleware";
import { allMessages, sendMessage } from "../Controllers/message-controller";

const router = express.Router();

router.route("/").post(protect, sendMessage);
router.route("/:chatId").get(protect, allMessages);

export default router;
