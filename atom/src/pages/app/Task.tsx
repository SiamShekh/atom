import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";

const Task = () => {

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
                tab === "available" ?
                    <>
                        <div className="flex justify-between items-center mt-4 gap-2">
                            <div className="flex items-center gap-2">
                                <div className="size-10 bg-white/10 rounded-full"></div>
                                <div className="">
                                    <p className="text-white font-medium">Join Community</p>
                                    <p className="text-white/60 text-xs">+500 ATOM</p>
                                </div>
                            </div>
                            <button className="capitalize bg-white text-black px-5 h-fit py-1 font-montserrat font-medium rounded-full">start</button>
                        </div>
                        <div className="flex justify-between items-center mt-2 gap-2">
                            <div className="flex items-center gap-2">
                                <div className="size-10 bg-white/10 rounded-full"></div>
                                <div className="">
                                    <p className="text-white font-medium">Follow on X</p>
                                    <p className="text-white/60 text-xs">+500 ATOM</p>
                                </div>
                            </div>
                            <button className="capitalize bg-white text-black px-5 h-fit py-1 font-montserrat font-medium rounded-full">start</button>
                        </div>
                    </> :
                    <>
                        <div className="flex justify-between items-center mt-4 gap-2">
                            <div className="flex items-center gap-2">
                                <div className="size-10 bg-white/10 rounded-full"></div>
                                <div className="">
                                    <p className="text-white font-medium">Follow on X</p>
                                    <p className="text-white/60 text-xs">+500 ATOM</p>
                                </div>
                            </div>
                            <button className="capitalize bg-white h-8 text-black px-5 py-1 font-montserrat font-medium rounded-full"><FaCheckCircle />
                            </button>
                        </div>
                    </>
            }

        </div>
    );
};

export default Task;