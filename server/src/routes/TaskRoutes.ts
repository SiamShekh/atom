import { Router } from "express";
import { userIntance } from "../modules/user/userAuth";
import { adminTask } from "../modules/task/task.services.admin";
import { task } from "../modules/task/task.services";
import AuthenticateUser from "../utils/AuthenticateUser";

const TaskRoute = Router();
// API FOR ADMIN
TaskRoute.post("/", adminTask.createTask);
TaskRoute.get("/", adminTask.getAll);
TaskRoute.delete("/", adminTask.deleteTask);
TaskRoute.get("/admin", adminTask.getSingle);
TaskRoute.patch("/", adminTask.updateTask);

// API FOR USER
TaskRoute.get("/user", AuthenticateUser, task.getTask);
TaskRoute.post("/user", AuthenticateUser, task.claimTask);
export default TaskRoute;