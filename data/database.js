import mongoose from "mongoose";

export const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI, { dbName: "node_todo_app" })
    .then(console.log("Database Connected"));
};
