import { Router } from "express";
import UserRoute from "./UserRoutes";
import TaskRoute from "./TaskRoutes";
import SettingRoute from "./SettingRoutes";

const router = Router();
router.use("/user",UserRoute);
router.use("/task",TaskRoute);
router.use("/setting",SettingRoute);

export default router;