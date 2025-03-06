import { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { allTask } from "../../api/task.user";
import { task } from "../../types";
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
    const [availableTask, setAvailableTask] = useState<task[]>([]);
    const [completedTask, setCompletedTask] = useState<task[]>([]);
    const [tab, setTab] = useState<"available" | "complete">("available");
    const [isLinkOpen, setIsLinkOpen] = useState(false);
    const [isClaimOpen, setIsClaimOpen] = useState(false);

    useEffect(() => {
        if (data) {
            const available = data.filter((task: task) => !task.isComplete);
            const completed = data.filter((task: task) => task.isComplete);

            setAvailableTask(available);
            setCompletedTask(completed);
        }
    }, [data]);

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
                        availableTask?.map((task: task) => (
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
                        ))
                        :
                        completedTask?.map((task: task) => (
                            <div key={task?._id} className="flex justify-between items-center mt-4 gap-2">
                                <div className="flex items-center gap-2">
                                    <TaskTypeIconGenarator type={task?.type} />
                                    <div className="">
                                        <p className="text-white font-medium">{task?.title}</p>
                                        <p className="text-white/60 text-xs">+{task?.reward} ATOM</p>
                                    </div>
                                </div>
                                <button className="capitalize bg-white h-8 text-black px-5 py-1 font-montserrat font-medium rounded-full"><FaCheckCircle />
                                </button>
                            </div>
                        ))
            }

        </div>
    );
};

export default Task;