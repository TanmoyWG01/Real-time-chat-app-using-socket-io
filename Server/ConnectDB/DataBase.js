import mongoose from "mongoose";
import colors from "colors"

const url = process.env.MONGO_URL;

export const connectToDatabase = async () => {
    try {
     await mongoose.connect(url);
      console.log("Connected to MongoDB Database!".cyan);
    } catch (err) {
      throw err;
    }
  };

