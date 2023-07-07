import express from "express";
import { config } from "dotenv";
import userRouter from "./routes/user.js";
import cookieParser from "cookie-parser";
import taskRouter from "./routes/task.js";
import cors from "cors";

export const app = express();

config({ path: "./data/config.env" });

//using middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: [process.env.FRONTEND_URL],
    methods: ["POST", "PUT", "GET", "DELETE"],
  })
);
//using routes
app.use("/api/v1/users/", userRouter);
app.use("/api/v1/task/", taskRouter);

app.get("/", (req, res) => {
  res.send("Hello World");
});
