import { MdDelete, MdEdit } from "react-icons/md";
import { deleteTask, getAllTaskAdmin } from "../../api/task";
import { task } from "../../types";
import { useEffect } from "react";
import { QueryStatus } from "@reduxjs/toolkit/query";
import { toast } from "sonner";

const Loading = () => (
    <div className="flex items-center justify-between w-full gap-2 bg-white/10 p-2 rounded-md mt-1">
        <div className="flex items-center gap-2">
            <div className="size-10 bg-white/10 rounded-full" />
            <div>
                <div className="w-32 h-5 bg-white/10 rounded-md"></div>
                <div className="w-20 h-3 mt-1 bg-white/10 rounded-md"></div>
            </div>
        </div>
        <div className="flex gap-2">
            <button className="bg-white/10 px-3 py-1 h-5 w-10 rounded-md" />
            <button className="bg-white/10 px-3 py-1 h-5 w-10 rounded-md" />
        </div>
    </div>
);

const Task = () => {
    const { data: taskData, isLoading } = getAllTaskAdmin(undefined);
    const [deleteMutation, { status }] = deleteTask();

    useEffect(() => {
        switch (status) {
            case QueryStatus.fulfilled:
                toast.dismiss();
                toast.success("Task successfuly created.");
                break;
            case QueryStatus.rejected:
                toast.dismiss();
                toast.error("Task is not deleted.");
                break;
            case QueryStatus.pending:
                toast.dismiss();
                toast.loading("Loading.");
                break;
        }
    }, [status])
    return (
        <div className="">
            {
                isLoading ? <>
                    <Loading />
                    <Loading />
                    <Loading />
                    <Loading />
                </> :
                    taskData?.length === 0 ? <>
                    <p className="font-montserrat font-medium">No Task In Database.</p>
                    </> :
                        taskData?.map((task: task) => (
                            <div key={task?._id} className="flex items-center justify-between w-full gap-2 bg-white/10 p-2 rounded-md">
                                <div className="flex items-center gap-2">
                                    <div className="size-10 bg-white/10 rounded-full flex items-center justify-center text-white font-medium text-xs">{task?.reward}</div>
                                    <div>
                                        <p className="text-sm font-montserrat font-medium text-white">{task?.title}</p>
                                        <p className="text-xs font-montserrat lg:w-96 md:w-48 w-32 line-clamp-1 font-medium text-white/60">{task?.href}</p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => deleteMutation(task._id)} className="bg-white/10 px-3 py-1 rounded-full text-sm font-montserrat font-medium">
                                        <MdDelete />
                                    </button>
                                    <button className="bg-white/10 px-3 py-1 rounded-full text-sm font-montserrat font-medium">
                                        <MdEdit />
                                    </button>
                                </div>
                            </div>
                        ))
            }

        </div>
    );
};

export default Task;