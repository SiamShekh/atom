import { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { allTask, compeleteTask } from "../../api/task.user";
import { CompeletedTask, task } from "../../types";
import TaskTypeIconGenarator from "../../utils/TaskTypeIconGenarator";
import WebApp from "@twa-dev/sdk";


const Loading = () => (
    <div className="flex justify-between items-center mt-2 gap-2">
        <div className="flex items-center gap-2">
            <div className="size-10 bg-white/10 rounded-full"></div>
            <div>
                <div className="w-32 h-5 rounded-md bg-white/10"></div>
                <div className="w-20 h-3 mt-1 rounded-md bg-white/10"></div>
            </div>
        </div>
        <div className="w-20 h-7 rounded-full bg-white/10"></div>
    </div>
);

const Task = () => {
    const { data, isLoading } = allTask(undefined);
    const [tab, setTab] = useState<"available" | "complete">("available");


    return (
        <div className="p-3 font-montserrat">
            <p className="font-medium text-2xl">Tasks</p>
            <p className="capitalize text-sm text-white/60">get rewards by complete task</p>

            <div className="h-8 w-full flex rounded-lg overflow-hidden mt-3">
                <button onClick={() => setTab("available")} className={`flex-1 ${tab === "available" ? "bg-white text-black font-medium" : "bg-white/10"}`}>Available</button>
                <button onClick={() => setTab("complete")} className={`flex-1 ${tab === "complete" ? "bg-white text-black font-medium" : "bg-white/10"}`}>Complete</button>
            </div>

            {
                isLoading ? <>
                    <Loading />
                    <Loading />
                    <Loading />
                    <Loading />
                </> :
                    tab === "available" ?
                        (
                            data?.incomplete?.length === 0 ? <div className="flex items-center justify-center mt-10 text-2xl font-semibold">
                                <p>No data</p>
                            </div> :
                                data?.incomplete?.map((task: task) => (
                                    <TaskItem task={task} key={task?._id} />
                                ))
                        )
                        :
                        (
                            data?.complete?.length === 0 ? <div className="flex items-center justify-center mt-10 text-2xl font-semibold">
                                <p>No data</p>
                            </div> :
                                data?.complete?.map((task: CompeletedTask) => (
                                    <div key={task?._id} className="flex justify-between items-center mt-4 gap-2">
                                        <div className="flex items-center gap-2">
                                            <TaskTypeIconGenarator type={task?.taskId?.type} />
                                            <div className="">
                                                <p className="text-white font-medium">{task?.taskId?.title}</p>
                                                <p className="text-white/60 text-xs">+{task?.taskId?.reward} ATOM</p>
                                            </div>
                                        </div>
                                        <button className="capitalize bg-white h-8 text-black px-5 py-1 font-montserrat font-medium rounded-full"><FaCheckCircle />
                                        </button>
                                    </div>
                                ))
                        )
            }

        </div>
    );
};

export default Task;

const TaskItem = ({ task }: { task: task }) => {
    const [isLinkOpen, setIsLinkOpen] = useState(false);
    const [isClaimOpen, setIsClaimOpen] = useState(false);
    const [claimTask] = compeleteTask();

    const completeTaskHandler = (e: task) => {
        switch (e.type) {
            case "telegram":
                WebApp.openTelegramLink(e.href);
                setIsLinkOpen(true);
                break;

            default:
                WebApp.openLink(e.href);
                setIsLinkOpen(true);
                break;
        }
    }

    const claimRewards = (e: task) => {
        console.log("Request For Claim Rewards.");
        claimTask({ id: e?._id });
    }


    useEffect(() => {
        if (isLinkOpen === true) {
            setTimeout(() => {
                setIsLinkOpen(false);
                setIsClaimOpen(true);
            }, 5000);
        }
    }, [isLinkOpen]);

    return (
        <div key={task?._id} className="flex justify-between items-center mt-4 gap-2">
            <div className="flex items-center gap-2">
                <TaskTypeIconGenarator type={task?.type} />
                <div className="">
                    <p className="text-white font-medium line-clamp-1">{task?.title}</p>
                    <p className="text-white/60 text-xs">+{task?.reward} ATOM</p>
                </div>
            </div>
            {
                isLinkOpen ?
                    <button className="capitalize bg-white h-8 text-black px-5 py-1 font-montserrat font-medium rounded-full flex justify-center items-center">
                        <span className="loading loading-spinner loading-xs"></span>
                    </button> :
                    isClaimOpen ?
                        <button onClick={() => claimRewards(task)} className="capitalize bg-white text-black px-5 h-fit py-1 font-montserrat font-medium rounded-full">claim</button> :
                        <button onClick={() => completeTaskHandler(task)} className="capitalize bg-white text-black px-5 h-fit py-1 font-montserrat font-medium rounded-full">start</button>
            }
        </div>
    )
};