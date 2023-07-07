import express from "express";
import {
  deleteTask,
  getMyTasks,
  newTask,
  updateTask,
} from "../controllers/task.js";
import { isAuthenticated } from "../middlewares/auth.js";

const taskRouter = express.Router();

taskRouter.post("/new", isAuthenticated, newTask);
taskRouter.get("/mytasks", isAuthenticated, getMyTasks);

taskRouter
  .route("/:id")
  .put(isAuthenticated, updateTask)
  .delete(isAuthenticated, deleteTask);

export default taskRouter;
