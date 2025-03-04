import { Router } from "express";
import { userIntance } from "../modules/user/userAuth";
import { adminTask } from "../modules/task/task.services.admin";

const TaskRoute = Router();
TaskRoute.post("/", adminTask.createTask);

export default TaskRoute;