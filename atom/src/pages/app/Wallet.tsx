import { useContext } from "react";
import { Provider } from "../../utils/ContextUri";
import { History } from "../../api/user";
import { CiBoxList } from "react-icons/ci";
import { GoSponsorTiers } from "react-icons/go";
import { LuLoaderPinwheel } from "react-icons/lu";

const Wallet = () => {
    const { user } = useContext(Provider);
    const { data, isLoading } = History(undefined);

    return (
        <div>
            <div className="h-52 w-full bg-[#2A4735] rounded-b-2xl p-3 font-montserrat relative overflow-hidden">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="font-semibold text-white">Hello {user?.name}</p>
                        <p className="text-white/50 text-sm">How are you doing?</p>
                    </div>
                    <div className="size-10 rounded-full bg-white/10 border border-white/10 flex items-center justify-center">{user?.name?.slice(0, 2)}</div>
                </div>

                <div className="mt-10 relative overflow-hidden h-full">
                    <div className="p-4 m-2 bg-yellow-400 h-10 rounded-xl relative top-0 left-0 z-0"></div>
                    <div className="p-4 bg-[#003E85] h-20 rounded-xl absolute w-full top-5 left-0 z-10">
                        <p className="capitalize font-semibold text-xs text-white/50">Wallet balance</p>
                        <p className="text-2xl font-semibold text-white">{user?.balance} ATOM</p>
                    </div>
                </div>
            </div>

            <div className="p-3 font-montserrat">
                <p className="text-white/50 text-sm">History</p>
                {
                    isLoading ?
                        <>
                            <Loading />
                            <Loading />
                            <Loading />
                            <Loading />
                        </> :
                        data?.map((item: CombinedActivity, i) => (
                            <div className="flex items-center justify-between gap-2 mt-2" key={i}>
                                <div className="flex items-center gap-2">
                                    <p className="text-2xl bg-white/10 p-2 rounded-full">
                                        {
                                            item?.taskId ?
                                                <CiBoxList /> :
                                                item?.type === "ads" ?
                                                    <GoSponsorTiers /> :
                                                    <LuLoaderPinwheel />
                                        }
                                    </p>
                                    <div>
                                        <p className="font-medium ">{item?.taskId ? "Task Completed" : item?.type === "ads" ? "Ads Watched" : "Spin Wheel"}</p>
                                        <p className="font-semibold text-white/40 text-xs">{new Date(item?.createdAt).toLocaleTimeString()}</p>
                                    </div>
                                </div>
                                <p>+{item?.point ? item?.point : item?.reward}</p>
                            </div>
                        ))
                }
            </div>
        </div>
    );
};

export default Wallet;

const Loading = () => (
    <div className="flex items-center justify-between gap-2 mt-2">
        <div className="flex items-center gap-2">
            <div className="size-10 rounded-full bg-white/10"></div>
            <div>
                <p className="w-28 h-4 rounded-sm bg-white/10" />
                <p className="w-14 h-4 rounded-sm bg-white/10 mt-1" />
            </div>
        </div>
        <p className="w-14 h-4 rounded-sm bg-white/10 mt-1" />
    </div>
);

interface CombinedActivity {
    _id: string;
    userId: string;
    reward?: number;      // For spin and ads
    point?: number;       // For tasks
    type?: string;        // For spin and ads (e.g., 'spin', 'ads')
    taskId?: string;      // For tasks
    createdAt: string;    // ISO date string
    updatedAt: string;    // ISO date string
    __v: number;
}
