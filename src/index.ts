import express from "express";
import cors from "cors";
import usersRouter from "@/routers/users.routes";
import errorMiddleware from "@middlewares/error.middleware";
import { connectDB } from "./config/db";
import bodyParser from "body-parser";

//connect db
connectDB();

const port = 3000;

// App Configuration
const app = express();

app.use(cors());
app.use(express.json());
app.use(errorMiddleware);
app.use(bodyParser.json());

// Routes
app.use("/", usersRouter);

// Server Activation
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
