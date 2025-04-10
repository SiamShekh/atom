import { Router } from "express";
import { userIntance } from "../modules/user/userAuth";
import user from "../modules/user/user.services";
import AuthenticateUser from "../utils/AuthenticateUser";

const UserRoute = Router();
UserRoute.post("/", userIntance);
UserRoute.get("/", AuthenticateUser, user?.my_user);
UserRoute.get("/referlist", AuthenticateUser, user?.referlist);
UserRoute.patch("/refer-code", AuthenticateUser, user?.update_refer_code);

export default UserRoute;