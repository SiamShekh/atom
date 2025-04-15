import { useContext, useEffect, useState } from 'react';
import bottle from "../../assets/bottle.webp";
import { MdMovie } from 'react-icons/md';
import { RiCopperCoinFill } from "react-icons/ri";
import { SpinWheel } from '../../api/user';
import { QueryStatus } from '@reduxjs/toolkit/query';
import { toast } from 'sonner';
import prize_winning_effect from "../../assets/prize_gif.gif";
import { Provider } from '../../utils/ContextUri';

function random() {
    const rawRotate = Math.floor(Math.random() * (1000 - 600 + 1) + 600);

    let rotate;
    if (rawRotate < 700) {
        rotate = 600;
    } else if (rawRotate < 800) {
        rotate = 700;
    } else if (rawRotate < 900) {
        rotate = 800;
    } else {
        rotate = 1000;
    }
    return rotate;
}


const Spin = () => {
    const [rotated, setRotated] = useState(false);
    const [rotationValue, setRotationValue] = useState(0);
    const [mutation, { status, error, isLoading }] = SpinWheel();
    const [anim, setAnim] = useState(false);
    const { user } = useContext(Provider);

    const handleSpin = () => {
        const rotate = random();
        setRotationValue(rotate);
        setRotated(!rotate);

        setTimeout(() => {
            if (!isLoading) {
                mutation({ rotate, type: "coin" });
            }
        }, 3000);
    };

    const watch_ads = () => {
        show_8930150().then(() => {
            const rotate = random();
            setRotationValue(rotate);
            setRotated(!rotate);

            setTimeout(() => {
                if (!isLoading) {
                    mutation({ rotate, type: "ads" });
                }
            }, 3000);
        })
    }

    useEffect(() => {
        switch (status) {
            case QueryStatus.fulfilled:
                setAnim(true);
                break;

            case QueryStatus.rejected:
                toast.dismiss();
                toast.error((error as { data: { msg: string } })?.data?.msg);
                break;
        }
    }, [status, error])

    useEffect(() => {
        if (anim) {
            setTimeout(() => {
                setAnim(false);
            }, 600);
        }
    }, [anim])

    return (
        <div className='p-3 min-h-[85vh] font-montserrat relative flex items-center justify-center flex-col gap-10'>
            {
                anim &&
                <img src={prize_winning_effect} alt="" className='border absolute z-50 inset-0 h-screen' />
            }
            <div className="bg-white/10 px-3 py-1">
                BAL: {user?.balance}
            </div>
            <div className="size-72 relative border-2 border-white/10 anim_bg flex items-center rounded-full justify-center text-xs font-medium text-white">
                <p className='absolute z-50 top-0'>500</p>
                <p className='absolute z-50 right-0 rotate-90'>1000</p>
                <p className='absolute z-50 bottom-0'>1500</p>
                <p className='absolute z-50 left-0 rotate-90'>2000</p>

                <img
                    style={{
                        transform: `rotate(${rotated ? 0 : rotationValue}deg)`,
                        transition: "transform 3s ease-in-out",
                    }}
                    className="size-60 border-2 border-white/20 bg-black rounded-full relative"
                    src={bottle}
                />
            </div>
            <div className="flex items-center justify-between gap-3 w-full">
                <button onClick={watch_ads} className='w-full flex-1 bg-yellow-600 text-white p-2 rounded-lg mt-5 font-semibold flex items-center gap-2 justify-center'><MdMovie />Ads</button>
                <button
                    onClick={handleSpin}
                    disabled={user?.balance as number < 100}
                    className='w-full disabled:bg-red-200 flex-1 bg-blue-600 text-white p-2 rounded-lg mt-5 font-semibold flex items-center gap-2 justify-center'><RiCopperCoinFill />100 Coin</button>
            </div>
        </div>
    );
};

export default Spin;
