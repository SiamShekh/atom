import { useContext, useEffect, useState } from "react";
import { CiSettings } from "react-icons/ci";
import { FaPercent } from "react-icons/fa";
import { FaFaceGrinStars, FaPeopleGroup } from "react-icons/fa6";
import { IoIosPersonAdd } from "react-icons/io";
import { Provider } from "../../utils/ContextUri";
import WebApp from "@twa-dev/sdk";
import { Referlist, UpdateReferCode as UpdateCode } from "../../api/user";
import { user } from "../../types";
import { FieldValues, useForm } from "react-hook-form";
import { QueryStatus } from "@reduxjs/toolkit/query";
import { toast } from "sonner";

const Invite = () => {
    const { setting, user } = useContext(Provider);
    const { data } = Referlist(undefined);
    const [updateCode, { error, status }] = UpdateCode();

    const [editReferCode, setEditReferCode] = useState(false);
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

    const url = 'https://t.me/SiamDev?startApp=' + user?.referCode;
    const msg = 'This is refer link';

    const refer: string[] = [(data?.refer[0] as user)?.name?.slice(0, 2), (data?.refer[1] as user)?.name?.slice(0, 2), (data?.refer[2] as user)?.name?.slice(0, 2)];

    const { register, handleSubmit, reset } = useForm();
    const UpdateReferCode = (e: FieldValues) => {
        updateCode(e?.referCode);
    };

    useEffect(() => {
        switch (status) {
            case QueryStatus?.fulfilled:
                toast.dismiss();
                toast.success('Successfully changed');
                reset();
                setEditReferCode(false);
                break;

            case QueryStatus.rejected:
                toast.dismiss();
                toast.error((error as { data: { msg: string } })?.data?.msg);
                break;
        }
    }, [status, error, reset]);

    return (
        <div className="font-montserrat">
            <dialog open={editReferCode} className="modal">
                <div className="modal-box p-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl">
                    <form onSubmit={handleSubmit(UpdateReferCode)}>
                        <div>
                            <p className="text-xs font-semibold uppercase">Custom Refer Code</p>
                            <input {...register("referCode")} required type="text" placeholder="refer code" className="uppercase text-sm outline-none w-full p-2 mt-2 rounded-xl border" />
                        </div>
                        <button type="submit" className="uppercase text-xs bg-white px-2 py-1 rounded-md mt-3 text-black font-semibold">Update code</button>
                    </form>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button onClick={() => setEditReferCode(false)}>close</button>
                </form>
            </dialog>

            <div className="p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="size-10 rounded-2xl bg-white/10 border border-white/40 font-montserrat font-medium flex items-center justify-center">SA</div>
                        <div>
                            <p className="font-medium">{user?.name}</p>
                            <p className="font-medium text-xs text-white/40">{user?.referCode}</p>
                        </div>
                    </div>
                    <div onClick={() => setEditReferCode(true)} className="bg-white/10 rounded-xl text-white p-2 text-2xl">
                        <CiSettings />
                    </div>
                </div>
            </div>

            <div className="bg-white/10 m-4 rounded-xl relative">
                <div className="p-3 ">
                    <p className="font-montserrat uppercase font-bold text-sm text-white/40">invite</p>
                    <div className="w-full h-16 gap-1 p-1 bg-white/10 rounded-2xl mt-2 grid grid-cols-4">
                        {
                            refer?.map((name) => (
                                <div key={name} className={`rounded-2xl flex items-center justify-center ${name ? 'bg-white/30' : 'bg-white/5'}`}>{name}</div>
                            ))
                        }
                        <div className="bg-white/30 rounded-2xl flex items-center justify-center text-xl font-semibold">{data?.count}..</div>
                    </div>
                </div>
                <div
                    onClick={() => {
                        WebApp.openTelegramLink(`https://t.me/share/url?url=${url}&text=${msg}`)
                    }}
                    className="bg-blue-800 cursor-pointer text-white w-full h-12 rounded-b-xl flex items-center p-3 gap-2 uppercase font-semibold">
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