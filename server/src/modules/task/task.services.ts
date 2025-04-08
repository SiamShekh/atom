import catchAsync from "../../utils/catch_async";
import { TaskModel } from "./task.model";

const getTask = catchAsync(async (req, res) => {
    const completedTask = await TaskModel.find({ isPublish: true, isDelete: false });
    const result = await TaskModel.find({});

    const inCompletedTask: any[] = [];
    result.map((task: any) => {
        const tas = completedTask.find((c) => {
            if (String(c?._id) === String(task?._id)) {
                inCompletedTask.push({
                    ...task?._doc, isComplete: true
                })
            } else {
                inCompletedTask.push({
                    ...task?._doc, isComplete: false
                })
            }
        });
    });

    res.send(inCompletedTask);
})

export const task = {
    getTask
}