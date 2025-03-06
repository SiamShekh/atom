import { Router } from "express";
import { userIntance } from "../modules/user/userAuth";
import { adminTask } from "../modules/task/task.services.admin";
import { task } from "../modules/task/task.services";

const TaskRoute = Router();
// API FOR ADMIN
TaskRoute.post("/", adminTask.createTask);
TaskRoute.get("/", adminTask.getAll);
TaskRoute.delete("/", adminTask.deleteTask);
TaskRoute.get("/admin", adminTask.getSingle);
TaskRoute.patch("/", adminTask.updateTask);

// API FOR USER
TaskRoute.get("/user", task.getTask);
export default TaskRoute;