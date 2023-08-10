import mongoose from "mongoose";
const dbUrl = "mongodb://0.0.0.0:27017/exampleExpressAPI";
export const connectDB = async () => {
  await mongoose
    .connect(dbUrl)
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.error("MongoDB connection error:", error));
};
