import { Router } from "express";
import { userIntance } from "../modules/user/userAuth";

const UserRoute = Router();
UserRoute.post("/", userIntance);

export default UserRoute;