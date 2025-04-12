import catchAsync from "../../utils/catch_async";
import { UserModel } from "../user/user.model";
import { TaskModel } from "./task.model";
import { TaskTrackingModel } from "./tracking.model";

const getTask = catchAsync(async (req, res) => {
    const completedTasks = await TaskTrackingModel.find({ userId: req?.user?._id }).populate("taskId");
    const completedTaskIds = completedTasks.map(task => task.taskId);

    const incompleteTasks = await TaskModel.find({
        _id: { $nin: completedTaskIds },
        isPublish: true,
        isDelete: false
    });

    res.send({ incomplete: incompleteTasks, complete: completedTasks });
});

const claimTask = catchAsync(async (req, res) => {
    const { id } = req.body;
    if (!id) {
        throw new Error("id is missing");
    }

    const task = await TaskModel.findById(id);
    const user = await UserModel.findById(req?.user?._id);
    if (!task || !user) {
        throw new Error("some data are missing");
    }

    user.balance += task.reward;
    await user.save();

    const tracking = await TaskTrackingModel.create([{ point: task.reward, taskId: task?._id, userId: user?._id }]);

    res.send(tracking);
})

export const task = {
    getTask,
    claimTask
}