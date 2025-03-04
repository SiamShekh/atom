import { Router } from "express";
import UserRoute from "./UserRoutes";
import TaskRoute from "./TaskRoutes";

const router = Router();
router.use("/user",UserRoute);
router.use("/task",TaskRoute);

export default router;