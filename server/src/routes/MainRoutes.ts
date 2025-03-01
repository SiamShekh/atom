import { Router } from "express";
import UserRoute from "./UserRoutes";

const router = Router();
router.use("/user",UserRoute);

export default router;