import { RequestHandler } from "express";
import { verify } from "jsonwebtoken";
import Env from "../environment";

const AuthenticateUser: RequestHandler = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            throw new Error("authorization token not found");
        }

        verify(token, Env?.secret, (error, decode) => {
            if (error) {
                next(error);
            }
            req.user = decode;
        })

        next();
    } catch (error) {
        next(error);
    }
}

export default AuthenticateUser;