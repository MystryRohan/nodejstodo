import { Task } from "../models/task.js";

export const newTask = async (req, res, next) => {
  const { title, description } = req.body;
  await Task.create({
    title,
    description,
    user: req.user,
  });
  res.status(201).json({
    success: true,
    message: "Task Added",
  });
};

export const getMyTasks = async (req, res, next) => {
  const { myId } = req.user._id;
  const tasks = await Task.find({ myId });
  res.status(200).json({
    success: true,
    message: "My Tasks",
    tasks: tasks,
  });
};

export const updateTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task)
    return res.status(404).json({ success: false, message: "invalid ID" });
  task.isCompleted = !task.isCompleted;
  await task.save();

  res.status(200).json({ success: true, message: "updated" });
};

export const deleteTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task)
    return res.status(404).json({ success: false, message: "invalid ID" });
  await task.deleteOne();

  res.status(200).json({ success: true, message: "deleted" });
};
