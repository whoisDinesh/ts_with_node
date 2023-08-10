import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(process.env.DB_URL)
    .then(() => console.log("Connected to MongoDB...."))
    .catch((error) => console.error("MongoDB connection error:", error));
};
