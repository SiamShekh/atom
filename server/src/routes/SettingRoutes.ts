import { Router } from "express";
import setting from "../modules/setting/setting.services";

const SettingRoute = Router();
SettingRoute.get("/", setting.getTask);

export default SettingRoute;