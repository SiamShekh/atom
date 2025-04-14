import { MdKeyboardArrowRight } from "react-icons/md";
import ads_img from "../../assets/trading_image.webp";
import { useContext, useEffect } from "react";
import { Provider } from "../../utils/ContextUri";
import { useTonConnectUI } from "@tonconnect/ui-react";
import { WatchAds } from "../../api/user";
import { QueryStatus } from "@reduxjs/toolkit/query";
import { toast } from "sonner";

const Home = () => {
    const { user } = useContext(Provider);
    const [ton] = useTonConnectUI();
    const [mutation, { status, error }] = WatchAds();
    const watch_ads = () => {
        show_8930150().then(() => {
            mutation(undefined);
        })
    }

    useEffect(() => {

        switch (status) {
            case QueryStatus.fulfilled:
                toast.dismiss();
                toast.success("Successfuly watched");
                break;

            case QueryStatus.rejected:
                toast.dismiss();
                toast.error((error as { data: { msg: string } })?.data?.msg);
                break;
        }
    }, [status, error])


    return (
        <div>
            <div className="bg-[#1AE01A] rounded-b-xl w-full flex items-center justify-between gap-2 p-3">
                <div className="flex items-center gap-2">
                    <div className="size-10 rounded-full bg-[#091625] text-white font-montserrat flex justify-center items-center">{user?.name?.slice(0, 2)}.</div>
                    <div className="">
                        <p className="font-montserrat text-[#091625] font-semibold">{user?.name}</p>

                        {
                            ton.connected ?
                                <button
                                    onClick={async () => {
                                        await ton.disconnect();
                                        window.location.reload();
                                    }}
                                    className="font-montserrat text-xs text-[#091625]/70 flex items-center font-semibold">Disconnect Wallet <MdKeyboardArrowRight className="text-xl" />
                                </button> :
                                <button
                                    onClick={async () => {
                                        await ton.openModal();
                                        window.location.reload();
                                    }}
                                    className="font-montserrat text-xs text-[#091625]/70 flex items-center font-semibold">Connect Wallet <MdKeyboardArrowRight className="text-xl" />
                                </button>
                        }
                    </div>
                </div>
                <p className="font-montserrat text-[#091625] font-semibold">{user?.balance} ATOM</p>
            </div>

            <div className="p-3">
                <div className="grid grid-cols-3 gap-2 items-center">
                    <div className="bg-white/10 p-2 rounded-lg flex flex-col items-center justify-center">
                        <p className="font-montserrat font-bold text-sm">58</p>
                        <p className="font-montserrat font-medium text-xs flex items-center">My Coin <MdKeyboardArrowRight className="text-xl" /></p>
                    </div>
                    <div className="bg-white/10 p-2 rounded-lg flex flex-col items-center justify-center">
                        <p className="font-montserrat font-bold text-sm">#58</p>
                        <p className="font-montserrat font-medium text-xs flex items-center">My Rank <MdKeyboardArrowRight className="text-xl" /></p>
                    </div>
                    <div className="bg-white/10 p-2 rounded-lg flex flex-col items-center justify-center">
                        <p className="font-montserrat font-bold text-sm">58</p>
                        <p className="font-montserrat font-medium text-xs flex items-center">My Frens <MdKeyboardArrowRight className="text-xl" /></p>
                    </div>
                </div>

                <div className="">
                    <p className="font-montserrat font-medium text-sm mt-5">Games</p>
                    <div className="p-3 bg-white/10 rounded-lg mt-1">
                        <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                                <div className="size-10 rounded-full bg-white/10"></div>
                                <div className="">
                                    <p className="font-montserrat font-medium">Tap Coin</p>
                                    <p className="font-montserrat font-medium text-xs text-white/50">up to +300</p>
                                </div>
                            </div>
                            <button className="capitalize bg-white text-black px-5 py-1 font-montserrat font-medium rounded-full">play</button>
                        </div>
                        <div className="flex items-center justify-between gap-2 mt-3">
                            <div className="flex items-center gap-2">
                                <div className="size-10 rounded-full bg-white/10"></div>
                                <div className="">
                                    <p className="font-montserrat font-medium">Mine Coin</p>
                                    <p className="font-montserrat font-medium text-xs text-white/50">up to +500</p>
                                </div>
                            </div>
                            <button className="capitalize bg-white text-black px-5 py-1 font-montserrat font-medium rounded-full">play</button>
                        </div>
                    </div>
                </div>

                <div className="">
                    <p className="font-montserrat font-medium text-sm mt-5">Ads</p>
                    <div className="p-3 bg-white/10 rounded-lg mt-1 relative overflow-hidden h-28 border border-white/30 flex items-center justify-center">
                        <img src={ads_img} alt="ads" className="absolute inset-0 z-0" />
                        <div className="absolute inset-0 z-10 w-full h-full bg-gradient-to-r from-black to-transparent" />
                        <div className="relative z-20 flex justify-between w-full">
                            <div className="font-montserrat">
                                <p className="font-bold text-white/80 capitalize">Watch and earn</p>
                                <p className="font-medium capitalize text-white/40">watch ads</p>
                            </div>
                            <button onClick={watch_ads} className="capitalize bg-white text-black px-5 h-fit py-1 font-montserrat font-medium rounded-full">watch</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;