import { NextFunction, Request, Response } from "express";
import { UserModel } from "./user.model";
import { isValid } from "@telegram-apps/init-data-node";
import Env from "../../environment";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import catchAsync from "../../utils/catch_async";

export const userIntance = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    
    const userBody = req.body.user;
    if (!isValid(req.body.init, Env.bot_token)) {
        const isUser = await UserModel.findOne({ uid: userBody.id }).session(session);

        if (!isUser) {
            const createUser = await UserModel.create([{
                name: userBody.first_name + " " + userBody.last_name,
                uid: userBody.id,
                username: userBody.username,
                referCode: userBody.id,
                referBy: req.body.startApp,
                lastSeen: new Date()
            }], { session });

            const payload = {
                _id: createUser[0]?._id,
                uid: createUser[0]?.uid,
            }

            const token = jwt.sign(payload, Env.secret);

            await session.commitTransaction();
            await session.endSession();

            res.send({ token });
            return;
        }

        const payload = {
            _id: isUser?._id,
            uid: isUser?.uid,
        }

        isUser.lastSeen = new Date();
        await isUser.save({ session });

        const token = jwt.sign(payload, Env.secret);
        await session.commitTransaction();
        await session.endSession();

        res.send({ token });
        return;
    } else {
        throw new Error("init token is invaild");
    }

});