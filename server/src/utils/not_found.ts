import { NextFunction, Request, Response } from "express";

const not_found = (req: Request, res: Response, next: NextFunction) => {
    res.send({
        status: false,
        msg: 'Path is not found',
        path: req.originalUrl
    })
};

export default not_found;