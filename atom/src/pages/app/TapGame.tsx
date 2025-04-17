import icon from "../../assets/coin.webp";
import { useDispatch, useSelector } from "react-redux";
import tap from "../../slice/tap.slice";
import { RootState } from "../../store";
import { TapCoin } from "../../api/user";
import { useEffect } from "react";
import { QueryStatus } from "@reduxjs/toolkit/query";
import { toast } from "sonner";

const TapGame = () => {
    const dispatch = useDispatch();
    const selector = useSelector((state: RootState) => state.tap);
    const [mutation, { isLoading, status }] = TapCoin();

    useEffect(() => {
        switch (status) {
            case QueryStatus.fulfilled:
                dispatch(tap.actions.clear());
                toast.dismiss();
                toast.success("Successfuly tap score claimed");
                break;

            case QueryStatus.rejected:
                toast.dismiss();
                toast.error("something went wrong");
                break;

            case QueryStatus.pending:
                toast.dismiss();
                toast.loading("loading");
                break;
        }
    }, [status, dispatch])
    return (
        <div className="p-3 font-montserrat">
            <div className="flex items-center justify-between">
                <p className="text-xl font-medium text-white">💰 {selector?.tap*10}</p>
                <button onClick={() => {
                    if (!isLoading) {
                        mutation(selector?.point);
                    }
                }} className="text-sm bg-yellow-500/30 border border-white/10 text-white px-3 py-[2px] rounded-lg">Claim</button>
            </div>
            {/* <div className="w-full h-[6px] mx-auto my-2 bg-white/10 rounded-full relative overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 w-20 h-full"></div>
            </div> */}
            {/* <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-white/50">
                    <RiCopperCoinFill />
                    <p className="uppercase text-sm font-semibold">starter</p>
                </div>
                <div className="flex items-center gap-2 text-white">
                    <RiCopperCoinFill />
                    <p className="uppercase text-sm font-semibold">pro</p>
                    <p className="text-sm rounded-md border border-white/10 bg-white/10 px-2">2000</p>
                </div>
            </div> */}

            <div className="relative" id="parents">
                <img
                    onClick={(e) => {
                        const parents = document.getElementById("parents");
                        if (!parents) {
                            return;
                        }
                        const div = document.createElement("div");
                        div.className = "px-3 bg-black/10 absolute click text-white backdrop-blur-lg text-center text-sm border border-white/10 rounded-md z-50";
                        div.style.position = "absolute";
                        const rect = parents.getBoundingClientRect();
                        div.style.top = `${e.clientY - rect.top}px`;
                        div.style.left = `${e.clientX - rect.left}px`;
                        div.textContent = "+10";
                        parents?.appendChild(div);

                        dispatch(tap.actions.newTap());

                        setTimeout(() => {
                            parents.removeChild(div);
                        }, 1000);
                    }}
                    src={icon} alt="icon" className="w-full" />
            </div>

            <div className="bg-white/10 px-3 py-1 w-fit font-medium rounded-lg border border-white/10 mx-auto">⚡ {selector.tap}/{selector.limit}</div>


        </div>
    );
};

export default TapGame;