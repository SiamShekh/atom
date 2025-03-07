import { Request, Response } from "express";
import { TaskModel } from "./task.model";
import catchAsync from "../../utils/catch_async";

const createTask = async (req: Request, res: Response) => {
    const body = req.body;

    const result = await TaskModel.create(body);
    res.send(result);
}

const getAll = catchAsync(async (req, res) => {
    const task = await TaskModel.find({ isDelete: false });

    res.send(task);
});

const deleteTask = catchAsync(async (req, res) => {
    const { taskId } = req.body;

    const task = await TaskModel.findById(taskId);
    if (!task) {
        throw new Error("Task is not found.");
    }

    if (task?.isDelete) {
        throw new Error("The task is already deleted.");
    }

    const deleteTask = await TaskModel.findByIdAndUpdate(task?._id, {
        isDelete: true
    });
    
    
    res.send(deleteTask);
});

const getSingle = catchAsync(async (req, res) => {
    const id = req.query.id;
    if (!id) {
        throw new Error("task id not found.");
    }

    const task = await TaskModel.findById(id);
    res.send(task);
});

const updateTask = catchAsync(async (req, res) => {
    const id = req.query.id;
    if (!id) {
        throw new Error("task id not found.");
    }

    const task = await TaskModel.findByIdAndUpdate(id, req.body);
    res.send(task);
});


export const adminTask = {
    createTask,
    getAll,
    deleteTask,
    getSingle,
    updateTask
}