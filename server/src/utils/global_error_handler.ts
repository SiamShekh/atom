import { NextFunction, Request, Response } from "express";

const global_error_handler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(400).send({
        status: false,
        msg: err.message
    })
};

export default global_error_handler;