import { useContext } from "react";
import { CiSettings } from "react-icons/ci";
import { FaPercent } from "react-icons/fa";
import { FaFaceGrinStars, FaPeopleGroup } from "react-icons/fa6";
import { IoIosPersonAdd } from "react-icons/io";
import { Provider } from "../../utils/ContextUri";

const Invite = () => {
    const { setting } = useContext(Provider);

    const features = [
        {
            icon: <IoIosPersonAdd />,
            text: `invite a normal friend and get ${setting?.genarelUserInviteBonus || 0} point`
        },
        {
            icon: <FaFaceGrinStars />,
            text: `invite a premium friend and get ${setting?.premiumUserInviteBonus || 0} point`
        },
        {
            icon: <FaPercent />,
            text: `get ${setting?.referCommission || 0}% lifetime of your friends earning`
        },
    ];


    return (
        <div className="font-montserrat">
            <div className="p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="size-10 rounded-2xl bg-white/10 border border-white/40 font-montserrat font-medium flex items-center justify-center">SA</div>
                        <div>
                            <p className="font-medium">Siam Sheikh</p>
                            <p className="font-medium text-xs text-white/40">687668674</p>
                        </div>
                    </div>
                    <div className="bg-white/10 rounded-xl text-white p-2 text-2xl">
                        <CiSettings />
                    </div>
                </div>
            </div>

            <div className="bg-white/10 m-4 rounded-xl relative">
                <div className="p-3 ">
                    <p className="font-montserrat uppercase font-bold text-sm text-white/40">invite</p>
                    <div className="w-full h-16 gap-1 p-1 bg-white/10 rounded-2xl mt-2 grid grid-cols-4">
                        <div className="bg-white/10 rounded-2xl"></div>
                        <div className="bg-white/10 rounded-2xl"></div>
                        <div className="bg-white/10 rounded-2xl"></div>
                        <div className="bg-white/10 rounded-2xl"></div>
                    </div>
                </div>
                <div className="bg-blue-800 text-white w-full h-12 rounded-b-xl flex items-center p-3 gap-2 uppercase font-semibold">
                    <FaPeopleGroup className="text-xl" />
                    Invite your group
                </div>
            </div>

            <div className="bg-white/10 p-2 m-4 border rounded-md border-white/30">
                {
                    features.map((v) => (
                        <div key={v?.text} className="flex items-center gap-2 uppercase text-sm font-semibold my-2">
                            <p className="text-3xl text-cyan-400">{v?.icon}</p>
                            <p className="text-sm">{v?.text}</p>
                        </div>
                    ))
                }

            </div>
        </div>
    );
};

export default Invite;