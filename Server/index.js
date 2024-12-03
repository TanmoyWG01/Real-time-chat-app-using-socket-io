import express from "express";
import dotenv from "dotenv";
// import { chats } from "./Data/data";
import { connectToDatabase } from "./ConnectDB/DataBase.js";
import colors from "colors";
import userRoutes from "./Routes/UserRoute.js";
import chatRoutes from "./Routes/ChatRoute.js";
import messageRoutes from "./Routes/MessageRoutes.js";
import { errorHandler, notFound } from "./middleware/error-middleware.js";

const app = express();
dotenv.config();
connectToDatabase();
app.use(express.json());

const port = process.env.PORT || 8080;

// MiddleWare
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

// Error Handler
app.use(notFound);
app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("API is running successfully!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}...`.yellow.bold);
});
