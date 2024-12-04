import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectToDatabase } from "./ConnectDB/DataBase.js";
import colors from "colors";
import userRoutes from "./Routes/UserRoute.js";
import chatRoutes from "./Routes/ChatRoute.js";
import messageRoutes from "./Routes/MessageRoutes.js";
import { errorHandler, notFound } from "./middleware/error-middleware.js";
import { Server } from "socket.io";

const app = express();
dotenv.config();

// Database connection with error handling
try {
  connectToDatabase();
} catch (error) {
  console.error("Database connection failed:".red, error.message);
  process.exit(1); // Exit process with failure
}

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 8080;

// Base API Route
app.get("/", (req, res) => {
  res.send("API is running successfully!");
});

// Middleware
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

// Error Handlers
app.use(notFound);
app.use(errorHandler);

// Server initialization
const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}...`.yellow.bold);
});

// Initialize Socket.IO
const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:5173",
  },
});

io.on("connection", (socket) => {
  try {
    console.log(`Connected to socket.io: ${socket.id}`);

    // Setup user in a room
    socket.on("setup", (userData) => {
      try {
        if (!userData || !userData._id) {
          throw new Error("Invalid user data for setup");
        }
        socket.join(userData._id);
        socket.emit("connected");
      } catch (error) {
        console.error("Error in setup handler:", error.message);
        socket.emit("error", { message: "Failed to setup connection" });
      }
    });

    // Join a chat room
    socket.on("join chat", (room) => {
      try {
        if (!room) {
          throw new Error("Room ID is required to join a chat");
        }
        socket.join(room);
        console.log("User Joined Room: " + room);
      } catch (error) {
        console.error("Error in join chat handler:", error.message);
        socket.emit("error", { message: "Failed to join chat room" });
      }
    });

    socket.on("new message", (newMessageReceived) => {
      try {
        let chat = newMessageReceived.chat;

        if (!chat || !chat.users) {
          console.error(
            "chat.users not defined or chat is invalid:",
            newMessageReceived
          );
          return;
        }

        chat.users.forEach((user) => {
          if (!user || !user._id) {
            console.error("Invalid user or missing user ID:", user);
            return;
          }

          if (user._id == newMessageReceived.sender._id) return;

          socket.in(user._id).emit("message received", newMessageReceived);
        });
      } catch (error) {
        console.error("Error occurred in 'new message' event:", error);
      }
    });

    // Handle socket disconnection
    socket.on("disconnect", () => {
      try {
        console.log(`Socket disconnected: ${socket.id}`.red);
      } catch (error) {
        console.error("Error during socket disconnection:", error.message);
      }
    });
  } catch (error) {
    console.error("Error in socket connection:", error.message);
    socket.emit("error", { message: "An unexpected error occurred" });
  }
});

// Global error handling for unexpected issues
process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error.message.red);
  process.exit(1); // Exit process with failure
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason.red);
  process.exit(1); // Exit process with failure
});
