import { Request, Response } from "express";
import { TaskModel } from "./task.model";

const createTask = async (req: Request, res: Response) => {
    const body = req.body;

    const result = await TaskModel.create(body);
    res.send(result);
}

export const adminTask = {
    createTask
}