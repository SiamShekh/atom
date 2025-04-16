import { Router } from "express";
import { userIntance } from "../modules/user/userAuth";
import user from "../modules/user/user.services";
import AuthenticateUser from "../utils/AuthenticateUser";
import ads from "../modules/ads/ads.services";
import spin from "../modules/spin/spin.services";

const UserRoute = Router();
UserRoute.post("/", userIntance);
UserRoute.get("/", AuthenticateUser, user?.my_user);
UserRoute.post("/watch-ads", AuthenticateUser, ads.watch_ads);
UserRoute.post("/spin", AuthenticateUser, spin.spin_wheel);
UserRoute.get("/referlist", AuthenticateUser, user?.referlist);
UserRoute.get("/history", AuthenticateUser, user?.history);
UserRoute.patch("/refer-code", AuthenticateUser, user?.update_refer_code);

export default UserRoute;